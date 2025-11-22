import { useEffect } from 'react'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { formatUnits } from 'viem'

import { Button } from '@/components/ui/button'
import { TOKEN_ADDRESS, DELEGATE_ADDRESS, ERC20_ABI } from '@/constants/contracts'
import { Spinner } from './spinner'

interface DelegateStepProps {
  onComplete: () => void
}

export function DelegateStep({ onComplete }: DelegateStepProps) {
  const { address } = useAccount()

  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: currentDelegate } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'delegates',
    args: address ? [address] : undefined,
  })

  const { data: hash, writeContract, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      onComplete()
    }
  }, [isSuccess, onComplete])

  const handleDelegate = () => {
    writeContract({
      address: TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'delegate',
      args: [DELEGATE_ADDRESS],
    })
  }

  const isLoading = isPending || isConfirming

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Delegate Votes</h2>
        <p className="text-white/60">
          Delegate your voting power to participate in governance
        </p>
      </div>

      <div className="space-y-4">
        <div className="glass-card p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/60">Balance</span>
            <span className="font-semibold">
              {balance ? formatUnits(balance, 18) : '0'} TOKENS
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60">Current delegate</span>
            <span className="font-mono text-sm">
              {currentDelegate &&
              currentDelegate !== '0x0000000000000000000000000000000000000000'
                ? formatAddress(currentDelegate)
                : 'Not delegated'}
            </span>
          </div>
        </div>

        <Button
          onClick={handleDelegate}
          disabled={isLoading}
          className="w-full uniswap-button h-14 text-lg"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {isConfirming ? 'Confirming...' : 'Delegating...'}
            </span>
          ) : (
            'Delegate my votes'
          )}
        </Button>
      </div>
    </div>
  )
}
