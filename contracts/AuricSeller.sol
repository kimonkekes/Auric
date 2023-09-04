//SPDX-License-Identifier: Unlicence
pragma solidity ^0.8.9;

import "./Auric.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuricSeller is Ownable {

  Auric auricToken;

  event BuyAuric(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event ClaimGold(address seller, uint256 amountOfTokens);
  event CharityDonation(uint256 amountOfEth);

  constructor(address tokenAddress) {
    auricToken = Auric(tokenAddress);
  }

  address charity = 0x16b30556Ae7793C9aDCBb6cBcA6ACe357f6201dD;

  function buyAuric() public payable returns (uint256) {

    require(msg.value > 0, "You must send ETH in order to buy Auric tokens");

    uint256 purchaseAmount = msg.value * 10**5;

    uint256 vendorBalance = auricToken.balanceOf(address(this));
    require(vendorBalance >= purchaseAmount, "Not enough Auric tokens available for purchase");

    (bool sent) = auricToken.transfer(msg.sender, purchaseAmount);
    require(sent, "Failed to transfer Auric tokens to the buyer");

    emit BuyAuric(msg.sender, msg.value, purchaseAmount);

    return purchaseAmount;
  }

  function claimGold(uint256 claimAmount) public {

    require(claimAmount > 0, "You must send Auric tokens in order to redeem them for gold");

    uint256 userBalance = auricToken.balanceOf(msg.sender);
    require(userBalance >= claimAmount, "Not enough Auric tokens available to redeem");

    (bool claim) = auricToken.transferFrom(msg.sender, address(this), claimAmount);
    require(claim, "Failed to transfer Auric tokens for redemption");

    emit ClaimGold(msg.sender, claimAmount);
  }

  function withdraw() public onlyOwner {

    uint256 ownerBalance = address(this).balance;
    uint256 ownerFunds = address(this).balance * 95 / 100;
    uint256 charityFunds = address(this).balance * 5 / 100;

    require(ownerBalance > 0, "Owner has no balance available to withdraw");

    (bool ownerETH,) = msg.sender.call{value: ownerFunds}("");
    require(ownerETH, "Failed to transfer ETH to the owner");

    (bool charityETH,) = charity.call{value: charityFunds}("");
    require(charityETH, "Failed to transfer ETH to the charity");

    emit CharityDonation(charityFunds);
  }
}