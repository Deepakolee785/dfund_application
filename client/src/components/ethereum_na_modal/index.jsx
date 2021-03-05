import Modal from 'antd/lib/modal/Modal'

const EthereumNotFound = () => {
	return (
		<Modal
			title='Unable to connet to Network!'
			visible={true}
			closable={false}
			footer={<></>}
		>
			<p>
				This Dapp requires Ethereum Blockchain to run. So, please intall{' '}
				<a href='https://metamask.io/' target='_blank' rel='noreferrer'>
					<strong>Metamask</strong>
				</a>{' '}
				browser extension to be the part of this amazing Dfund Network.
			</p>
		</Modal>
	)
}

export default EthereumNotFound
