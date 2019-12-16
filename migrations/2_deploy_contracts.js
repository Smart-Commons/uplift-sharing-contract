const Smartcommons = artifacts.require("SmartCommons");

module.exports = function(deployer) {
  deployer.deploy(Smartcommons);
};