// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Puma is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    uint256 private investmentIdCounter;

    address payable private systemAddress;

    struct Deal {
        string dealID;
        uint256 minAmt;
        uint256 amountRaised; // Default to 0
        uint256 targetAmt;
        uint256 floatingEndTimestamp; // Time till user can withdraw
        uint256 expirationTimestamp; // Time after which deal is expired and money need to be transferred back
        uint256 tokenID; // NFT
        uint256 promisedInterestRate; // User Inputted
        uint256 interestRate; // Actual Interest Rate, explicitly controlled!
        address payable companyAddress;
    }

    struct Investment {
        // uint256 investmentID;
        address payable investorAddress;
        uint256 amountInvested;
        // uint256 timestamp;
        string dealID;
    }

    mapping(string => Deal) public deals; // from dealID -> Deal
    mapping(uint256 => Investment) public investments; // from investmentID => Investment

    constructor(address payable _systemAddress) ERC721("MyNFT", "MNFT") {
        systemAddress = _systemAddress;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == systemAddress,
            "Only admin can call this function"
        );
        _;
    }

    function mintNFT(address payable recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIdCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIdCounter += 1;

        return newItemId;
    }

    function transferNFT(
        address actor,
        bool willSend,
        uint256 tokenID
    ) public {
        address sender = willSend ? actor : systemAddress;
        address receiver = willSend ? systemAddress : actor;
        require(
            ownerOf(tokenID) == sender,
            "Sender must be the owner of that Bill(NFT)"
        );
        _safeTransfer(sender, receiver, tokenID);
    }

    function addInvestment(
        address payable _investorAddress,
        string memory _dealID,
        uint256 amount
    ) public payable returns (uint256) {
        require(bytes(_dealID).length > 0, "Deal ID cannot be empty");
        require(deals[_dealID].targetAmt > 0, "Deal Does not exists!");
        require(
            deals[_dealID].floatingEndTimestamp > block.timestamp,
            "Floating period over! Can't invest"
        );
        require(
            deals[_dealID].targetAmt >= amount + deals[_dealID].amountRaised,
            "Can't Invest more than limit amount!"
        );
        uint256 leftAmt = deals[_dealID].targetAmt -
            deals[_dealID].amountRaised;
        require(
            amount >= deals[_dealID].minAmt ||
                (leftAmt < deals[_dealID].minAmt && amount == leftAmt),
            "Amount Invested must be >= min amount or be the last transaction"
        );

        payable(systemAddress).transfer(amount);

        investmentIdCounter++;
        investments[investmentIdCounter] = Investment({
            investorAddress: _investorAddress,
            amountInvested: amount,
            dealID: _dealID
        });

        deals[_dealID].amountRaised += amount;

        return investmentIdCounter;
    }

    function addDeal(
        string memory _dealID,
        uint256 _minAmt,
        uint256 _targetAmt,
        uint256 _floatingEndTimestamp,
        uint256 _expirationTimestamp,
        uint256 _tokenID,
        uint256 _interestRate,
        address payable _companyAddress
    ) external payable onlyAdmin {
        require(
            ownerOf(_tokenID) == systemAddress,
            "NFT must be transferred to systemAddress!"
        );
        require(bytes(_dealID).length > 0, "Deal ID cannot be empty");
        require(
            _expirationTimestamp > block.timestamp &&
                _expirationTimestamp >= _floatingEndTimestamp,
            "Invalid expiration timestamp"
        );
        require(
            _floatingEndTimestamp > block.timestamp,
            "Invalid floatingEnd timestamp!"
        );
        require(_minAmt > 0, "Can't accept 0 as min amount");
        require(
            _targetAmt >= _minAmt,
            "Target Amount should be more than/equal to minimum amount"
        );

        deals[_dealID] = Deal({
            dealID: _dealID,
            minAmt: _minAmt,
            amountRaised: 0,
            targetAmt: _targetAmt,
            floatingEndTimestamp: _floatingEndTimestamp,
            expirationTimestamp: _expirationTimestamp,
            tokenID: _tokenID,
            promisedInterestRate: _interestRate,
            interestRate: 0,
            companyAddress: _companyAddress
        });

        addInvestment(systemAddress, _dealID, (30 * _targetAmt) / 100);
    }

    function transferAllBackPerDeal(string memory _dealID)
        public
        payable
        onlyAdmin
    {
        require(deals[_dealID].targetAmt > 0, "Deal Does not exists!");
        require(
            deals[_dealID].expirationTimestamp >= block.timestamp,
            "Can't transfer before deal is expired"
        );
        uint256 interest = (deals[_dealID].targetAmt *
            (deals[_dealID].interestRate + 100) *
            (deals[_dealID].expirationTimestamp -
                deals[_dealID].floatingEndTimestamp)) / (100 * 365 days);
        require(msg.value >= interest, "Insufficient funds");
        for (uint256 i = 1; i < investmentIdCounter; i++) {
            if (
                keccak256(bytes(investments[i].dealID)) ==
                keccak256(bytes(_dealID)) &&
                investments[i].amountInvested != 0
            ) {
                payable(investments[i].investorAddress).transfer(interest);
                delete investments[i];
            }
        }
    }

    function revertInvestment(uint256 investmentID) external payable onlyAdmin {
        require(
            investments[investmentID].amountInvested > 0,
            "Investment does not exists!"
        );
        require(
            deals[investments[investmentID].dealID].floatingEndTimestamp >
                block.timestamp,
            "Freezing period started, can't withdraw now!"
        );
        require(
            investments[investmentID].amountInvested > 0,
            "Insufficient Balance"
        );

        require(
            msg.value >= investments[investmentID].amountInvested,
            "Insufficient funds"
        );
        payable(investments[investmentID].investorAddress).transfer(
            investments[investmentID].amountInvested
        );
        delete investments[investmentID];
    }

    function dealStartApproval(string memory dealID, bool approved)
        external
        payable
        onlyAdmin
    {
        require(deals[dealID].targetAmt > 0, "Deal Does not exists!");
        if (deals[dealID].amountRaised == deals[dealID].targetAmt || approved) {
            require(
                msg.value >= deals[dealID].amountRaised,
                "Insufficient Funds!"
            );
            payable(deals[dealID].companyAddress).transfer(
                deals[dealID].amountRaised
            );
            deals[dealID].interestRate = deals[dealID].promisedInterestRate;
        } else {
            // Interest Rate is already 0
            deals[dealID].expirationTimestamp = deals[dealID]
                .floatingEndTimestamp;
            transferAllBackPerDeal(dealID);
            transferNFT(
                deals[dealID].companyAddress,
                false,
                deals[dealID].tokenID
            );
        }
    }
}

