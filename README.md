# Auric - a gold investing dApp

Auric is a sample decentralized application (dApp). Its main currency is an ERC20 token named ["Auric"](https://sepolia.etherscan.io/token/0xc63e033c4452dec6ab5a52c9e835d56b27be83f4/), which supposedly represents ownership of an actual quantity in gold bars.

The process of purchasing and redeeming Auric tokens is handled by the [AuricSeller](https://sepolia.etherscan.io/address/0xaeef66784062d2ec5268f8010ff406c870683b62/) smart contract.

### Purchase Auric tokens

By connecting your Ethereum wallet app, you can purchase Auric for ETH. The notion is that by purchasing Auric, you invest in gold, without the need to actually have it in your possession or even stored in a remote vault.

### Claim Gold Bars

If you want the actual gold bars delivered to you, you can "claim" them. It is a 3-step process:

- **Step 1** is where you authorise the AuricSeller smart contract to handle your Auric tokens on your behalf.


- **Step 2** is where you return the tokens to the issuer.


- **Step 3** is where you receive a QR code representing the transaction. The QR code (along with proof of your crypto account ownership, e.g. a signed message) can be used to claim the gold bars *(the verification act is outside the scope of this dApp)*.


The AuricSeller smart contract also includes a function for the owner to claim the ETH that was used to purchase gold *(the owner's claim ETH function is not featured on this dApp)*. By claiming, 5% of profits is automatically donated to a predefined address (e.g. a charity).<br /><br />

## What's Included?

This repository contains a Hardhat project and a Next.js dApp:<br/><br/>


- The Hardhat project includes two Solidity smart contracts *(located inside the `/contracts` folder)*:
 
--**Auric**, the ERC20 token that represents gold bars

--**AuricSeller**, the contract that handles the exchange and redemption of Auric tokens<br/><br/>


- The Next.js frontend/dApp (located inside the `/auric-dapp` folder) is the way to interact with the smart contracts, which have been deployed to the Sepolia test network.<br /><br />



## Quick start


The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/kimonkekes/Auric.git
cd auric-dapp
npm install
```

Once installed, you can run the fronted with:

```sh
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser. You will need to have a crypto wallet installed in order to connect to and interact with the dApp.