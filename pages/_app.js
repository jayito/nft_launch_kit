import Head from 'next/head'
import '../styles/globals.css'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    })
  ],
  provider,
  webSocketProvider,
})


function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Head>
        <title>NFT LAUNCH KIT</title>
        <meta name="description" content="NFT LAUNCH KIT APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
