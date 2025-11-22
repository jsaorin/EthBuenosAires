import { ConnectButton } from '@rainbow-me/rainbowkit'

export function ConnectStep() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Connect your Wallet</h2>
        <p className="text-white/60">
          Connect your wallet to start delegating your votes
        </p>
      </div>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  )
}
