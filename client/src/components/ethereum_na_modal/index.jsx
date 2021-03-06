import Logo from '../../assets/images/Logo.svg'
import { ModalHeader } from './style'
import Modal from 'antd/lib/modal/Modal'
import { motion } from 'framer-motion'
import { animateSlideVariant } from '../../animation'

const EthereumNotFound = () => {
	return (
		<motion.div
			variants={animateSlideVariant}
			initial='initial'
			animate='animate'
		>
			<Modal
				title={
					<ModalHeader>
						<img src={Logo} alt='Dfund' />
					</ModalHeader>
				}
				visible={true}
				closable={false}
				footer={null}
			>
				<h3
					className='Center'
					style={{ color: 'red', marginBottom: '1.5rem' }}
				>
					Unable to connet to Network!
				</h3>

				<p>
					This Dapp requires Ethereum Blockchain to run. So, please
					install{' '}
					<a
						href='https://metamask.io/'
						target='_blank'
						rel='noreferrer'
					>
						<strong>
							<u>Metamask</u>
						</strong>
					</a>{' '}
					browser extension and <strong>connect</strong> to{' '}
					<strong>Ethereum Wallet</strong> to be the part of this
					amazing Dfund Network.
				</p>
			</Modal>
		</motion.div>
	)
}

export default EthereumNotFound
