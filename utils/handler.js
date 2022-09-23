import Web3 from 'web3'
import abi from '../config/abi.json'
import { LaunchContract } from '../config/address'

const RPC_URL = 'https://rinkeby.infura.io/v3/11aecfbfea094cdfa6c683a94b7a0178'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })

const getWeb3 = () => {
  if (typeof window !== "undefined") {
    const web3 = new Web3(window.ethereum || httpProvider)

    return web3
  } else {
    return null
  }
}

const checkValidator = (
  recipient,
  amount,
  setErrors
) => {
  let _errors = {}
  if (recipient === '' || !Web3.utils.isAddress(recipient))
    _errors.recipient = true

  if (amount <= 0)
    _errors.amount = true

  const length = Object.keys(_errors).length

  setErrors({ ..._errors })
  
  return length > 0 ? true : false
}

const send = async (recipient, amount, address) => {
  const web3 = getWeb3()

  if(web3 === null)
    return;
    
  const contract = new web3.eth.Contract(abi, LaunchContract);
  const _amount = amount.toString()

  try {
    await contract.methods.send(recipient, _amount).send({ from: address })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export {
  checkValidator,
  send
}