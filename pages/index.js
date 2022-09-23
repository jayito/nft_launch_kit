import { useState } from 'react'
import { useAccount } from 'wagmi'
import { checkValidator, send } from '../utils/handler'
import Layout from '../components/Layout'

const Home = () => {
  const { address, isConnected } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState({})

  const sendHandler = async () => {
    if (!isConnected || isPending)
      return;

    const isError = checkValidator(recipient, amount, setErrors)

    if (!isError) {
      setIsPending(true)
      const result = await send(recipient, amount, address)

      if(result) {
        alert('Donation succssed !')
      } else {
        alert('There is an error in transaction.')
      }

      setIsPending(false)
    }
  }

  return (
    <Layout title="">
      <div className="flex flex-col w-full xl:w-2/5 mx-auto justify-center items-center overflow-y-hidden">
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 pr-3">
            Donate
          </span>
          to anyone!
        </h1>
        <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
          You are able to donate some amounts to your friend!
        </p>

        <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-blue-300 py-2 font-bold mb-2">
              Recipient Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight"
              type="text"
              placeholder="0x00000000000"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isPending}
            />
            {errors?.recipient && (
              <div className="text-pink-400">Please input correct address.</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-blue-300 py-2 font-bold mb-2">
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPending}
            />
            {errors?.amount && (
              <div className="text-pink-400">The amount should be over 0.</div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              type="button"
              onClick={sendHandler}
            >
              {isPending ? "Pending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Home;