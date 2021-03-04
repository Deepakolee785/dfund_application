const path = require('path')

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		develop: {
			host: '127.0.0.1', // Localhost
			port: 8545,
			network_id: '*',
			gas: 4600000,
		},
	},
	compilers: {
		solc: {
			version: '^0.6.0',
		},
	},
}
