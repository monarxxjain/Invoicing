// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Investo is Ownable {
    IERC721 public nftContract;

    constructor(address _nftAddress) Ownable(msg.sender) {
        nftContract = IERC721(_nftAddress);
    }

    event DealRepaid(uint256 indexed dealID, address indexed seller, uint256 totalRepaid);

    // Represents a deal between the seller and the platform
    struct Deal {
        uint256 dealID;
        address seller; // the company/seller who initiated the deal
        uint256 minAmt; // minimum investment allowed per investor
        uint256 targetAmount; // total amount seller wants to raise
        uint256 amountRaised; // total amount raised by investors
        uint256 interestRate; // promised interest rate (e.g., 10 = 10%)
        uint256 startDate; // timestamp when deal starts and funds sent to seller
        uint256 endDate; // deadline by which seller must repay
        uint256 tokenID; // NFT used as collateral
        bool accepted; // whether admin has accepted the deal
        bool started; // deal has started and funds disbursed to seller
        bool repaid; // seller has repaid full amount with interest
        bool active; // used to mark deleted/rejected/expired deals
    }

    struct Investment {
        address investor;
        uint256 amount;
        bool withdrawn;
    }

    uint256 public dealCounter;
    uint256 public investmentCounter;

    mapping(uint256 => Deal) public deals; // dealID -> Deal
    mapping(uint256 => Investment[]) public dealInvestments; // dealID -> list of investments

    /// Seller creates a deal and transfers NFT as collateral
    function createDeal(
        uint256 _minAmt,
        uint256 _targetAmount,
        uint256 _interestRate,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _tokenID
    ) external returns (uint256) {
        require(_endDate > _startDate, "End date must be after start date");

        // Transfer NFT from seller to Investo contract (as collateral)
        nftContract.transferFrom(msg.sender, address(this), _tokenID);

        dealCounter++;
        deals[dealCounter] = Deal({
            dealID: dealCounter,
            seller: msg.sender,
            minAmt: _minAmt,
            targetAmount: _targetAmount,
            amountRaised: 0,
            interestRate: _interestRate,
            startDate: _startDate,
            endDate: _endDate,
            tokenID: _tokenID,
            accepted: false,
            started: false,
            repaid: false,
            active: true
        });

        return dealCounter; // Return the ID of the newly created deal
    }

    /// Admin either accepts and pays 30% upfront or rejects and returns NFT
    function approveOrRejectDeal(uint256 _dealID, bool approve) external onlyOwner {
        Deal storage deal = deals[_dealID];
        require(deal.active, "Inactive deal");
        require(!deal.accepted, "Already approved");

        if (approve) {
            deal.accepted = true;

            // Pay 30% upfront to the seller as initial liquidity
            uint256 upfront = (deal.targetAmount * 30) / 100;
            if (upfront > 0) {
                payable(deal.seller).transfer(upfront);
            }
        } else {
            // Rejected: return NFT back to seller and deactivate deal
            nftContract.transferFrom(address(this), deal.seller, deal.tokenID);
            deal.active = false;
        }
    }

    /// Investors can invest in any accepted, active deal before it starts
    function invest(uint256 _dealID) external payable {
        Deal storage deal = deals[_dealID];
        require(deal.active && deal.accepted, "Deal not active or accepted");
        require(block.timestamp < deal.startDate, "Deal already started");
        require(msg.value >= deal.minAmt, "Below minimum amount");
        require(deal.amountRaised + msg.value <= deal.targetAmount, "Exceeds target amount");

        deal.amountRaised += msg.value;
        dealInvestments[_dealID].push(Investment({
            investor: msg.sender,
            amount: msg.value,
            withdrawn: false
        }));
    }

    /// Admin starts the deal and sends the remaining 70% funds to seller
    function startDeal(uint256 _dealID) external onlyOwner {
        Deal storage deal = deals[_dealID];
        require(deal.accepted, "Deal not accepted");
        require(block.timestamp >= deal.startDate, "Start date not reached");
        require(!deal.started, "Already started");

        deal.started = true;

        uint256 totalRaised = deal.amountRaised;
        uint256 upfront = (deal.targetAmount * 30) / 100;
        uint256 remaining = totalRaised - upfront;

        require(address(this).balance >= remaining, "Insufficient contract balance");

        // Pay the remaining amount to seller (70%)
        payable(deal.seller).transfer(remaining);
    }

    /// Seller repays the full amount with interest before endDate
    /// @notice Seller repays total amount (principal + interest + upfront) to Investo before endDate.
    /// NFT collateral is returned to seller. No amount is distributed to investors here.
    function repay(uint256 _dealID) external payable {
        Deal storage deal = deals[_dealID];

        // Preconditions
        require(deal.started && deal.active, "Deal not started or inactive");
        require(block.timestamp <= deal.endDate, "Deal expired");
        require(msg.sender == deal.seller, "Only seller can repay");
        require(!deal.repaid, "Already repaid");

        // Calculate repayment
        uint256 interest = (deal.amountRaised * deal.interestRate) / 100;
        uint256 upfront = (deal.targetAmount * 30) / 100; // Platform upfront amount
        uint256 totalDue = deal.amountRaised + interest + upfront;

        require(msg.value >= totalDue, "Insufficient repayment");

        // Mark as repaid and deactivate the deal
        deal.repaid = true;
        deal.active = false;

        // Return NFT to seller
        nftContract.transferFrom(address(this), deal.seller, deal.tokenID);

        // Refund extra amount if any
        if (msg.value > totalDue) {
            payable(msg.sender).transfer(msg.value - totalDue);
        }

        emit DealRepaid(_dealID, msg.sender, totalDue);
    }


    /// Investors can withdraw their amount + interest if deal is successfully repaid
    function withdraw(uint256 _dealID) external {
        Deal storage deal = deals[_dealID];
        require(deal.repaid, "Deal not repaid yet");

        Investment[] storage investments = dealInvestments[_dealID];
        for (uint256 i = 0; i < investments.length; i++) {
            Investment storage inv = investments[i];
            if (inv.investor == msg.sender && !inv.withdrawn) {
                uint256 base = inv.amount;
                uint256 interest = (base * deal.interestRate) / 100;
                uint256 payout = base + interest;

                inv.withdrawn = true;
                payable(msg.sender).transfer(payout);
            }
        }
    }

    /// Admin can delete a deal (e.g., after rejection or failure)
    function deleteDeal(uint256 _dealID) external onlyOwner {
        Deal storage deal = deals[_dealID];
        require(deal.active, "Deal already deleted");

        deal.active = false;

        // Return NFT if held
        if (!deal.repaid && nftContract.ownerOf(deal.tokenID) == address(this)) {
            nftContract.transferFrom(address(this), deal.seller, deal.tokenID);
        }
    }

    /// Fallback to accept ETH
    receive() external payable {}
}
