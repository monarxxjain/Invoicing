// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyTestNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(address initialOwner) ERC721("TestNFT", "TNFT") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function mintNFT(address to) public onlyOwner returns (uint256) {
        tokenCounter++;
        _safeMint(to, tokenCounter);
        return tokenCounter;
    }
}
