// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    address private systemAddress;

    event NFTMinted(uint256 indexed _id);

    constructor() ERC721("MyNFT", "MNFT") {
      // systemAddress is the 
      systemAddress = msg.sender;
    }

    function mintNFT(address payable recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIdCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIdCounter += 1;

      emit NFTMinted(newItemId);

        return newItemId;
    }

    function transferNFT(address actor, bool toSend, uint256 tokenID) public {
        address sender = toSend ? actor : systemAddress;
        address receiver = toSend ? systemAddress : actor;
        require(
            _requireOwned(tokenID) == sender,
            "Sender must be the owner of that Bill(NFT)"
        );
        _safeTransfer(sender, receiver, tokenID);
    }
}


