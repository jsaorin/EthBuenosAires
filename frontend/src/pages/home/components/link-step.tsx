import { useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from './spinner'

interface LinkStepProps {
  onComplete: () => void
}

export function LinkStep({ onComplete }: LinkStepProps) {
  const { address } = useAccount()
  const [telegramUsername, setTelegramUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { signMessageAsync } = useSignMessage()

  const handleLink = async () => {
    if (!telegramUsername.trim()) {
      setError('Enter your Telegram username')
      return
    }

    if (!address) {
      setError('Wallet not connected')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const nonce = Math.random().toString(36).substring(2, 15)
      const message = `Link wallet ${address} to Telegram ${telegramUsername}, nonce=${nonce}`

      const signature = await signMessageAsync({ message })

      const response = await fetch('/api/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramUsername: telegramUsername.replace('@', ''),
          address,
          signature,
          nonce,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to link')
      }

      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Link Telegram</h2>
        <p className="text-white/60">
          Connect your wallet with your Telegram account to vote
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/60">Telegram Username</label>
          <Input
            placeholder="@your_username"
            value={telegramUsername}
            onChange={(e) => setTelegramUsername(e.target.value)}
            className="uniswap-input h-14"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <Button
          onClick={handleLink}
          disabled={isSubmitting || !telegramUsername.trim()}
          className="w-full uniswap-button h-14 text-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Signing...
            </span>
          ) : (
            'Sign and link'
          )}
        </Button>
      </div>
    </div>
  )
}
