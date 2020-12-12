var DfundFactory = artifacts.require('./DfundFactory.sol')

module.exports = function (deployer) {
	deployer.deploy(DfundFactory)
}
