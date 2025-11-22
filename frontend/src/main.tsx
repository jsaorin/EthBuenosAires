import '@rainbow-me/rainbowkit/styles.css'
import './styles/globals.css'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'

import { HomePage } from './pages/home'

const config = getDefaultConfig({
  appName: 'DAO Voting',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [base],
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <HomePage />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
)
