import { useConnect } from 'wagmi'
import Modal from 'react-modal'
import Image from 'next/image'
import CloseIcon from '../../../assets/icon_close.svg'
import MetaMaskIcon from '../../../assets/icon_metamask.svg'
import CoinBaseIcon from '../../../assets/icon_coinbase.svg'

Modal.setAppElement("#__next");

const WalletStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const WalletIcons = [MetaMaskIcon, CoinBaseIcon]

const WalletItem = ({ id, connector, connect }) => {
  return (
    <div
      className="flex items-center border rounded-md border-slate-500 my-5 px-12 py-3 cursor-pointer hover:bg-slate-600 hover:text-white transition duration-300"
      disabled={!connector.ready}
      onClick={() => connect({ connector })}
    >
      <div className="w-7 h-7">
        <Image
          src={WalletIcons[id]}
          alt="wallet icon"
        />
      </div>
      <div className="text-xl ml-2">
        {connector.name}
      </div>
    </div>
  )
}

const Wallet = (props) => {
  const { connect, connectors } = useConnect()

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={WalletStyles}
      contentLabel="Sellect Wallet"
    >
      <div className="relative py-2 px-4">
        <button onClick={props.closeModal} className="absolute right-0 top-0">
          <div className="w-6">
            <Image src={CloseIcon} alt="close icon" />
          </div>
        </button>
        <h2 className="text-3xl font-bold">
          Select Wallet
        </h2>
        <div className="mt-6">
          {connectors.map((connector, index) => (
            <WalletItem key={index} connector={connector} id={index} connect={connect} />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default Wallet;