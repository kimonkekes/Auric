async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contract with the account:", deployer.address);

  const Token = await ethers.getContractFactory("AuricSeller");
  const token = await Token.deploy("0xC63E033c4452DEC6AB5A52C9E835d56B27be83f4");
  await token.deployed();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
