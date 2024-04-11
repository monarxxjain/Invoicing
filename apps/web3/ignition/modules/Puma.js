const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PumaModule", (m) => {
  
  const lock = m.contract("Puma", ["0xCe52C63E5030879079c4C5B993A5EE8282a60A88"])

  return { lock };
});

