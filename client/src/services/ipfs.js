import ipfsClinet from 'ipfs-http-client'

const ipfs = ipfsClinet({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
})

export default ipfs
