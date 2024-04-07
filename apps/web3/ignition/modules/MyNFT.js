const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LockModule", (m) => {

  const lock = m.contract("MyNFT");

  return { lock };
});

