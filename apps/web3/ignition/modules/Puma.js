const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PumaModule", (m) => {
  
  const lock = m.contract("Puma", ["0x947221A97B5D546ad08AD0102a57eefA815B5f46"])

  return { lock };
});

