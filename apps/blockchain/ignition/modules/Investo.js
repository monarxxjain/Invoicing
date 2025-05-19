const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("InvestoModule", (m) => {
    
  const investo = m.contract("Investo", [m.getAccount(0)]); // systemAddress

  return { investo };
});
