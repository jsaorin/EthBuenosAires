import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Step } from '@/types'
import {
  StepIndicator,
  ConnectStep,
  DelegateStep,
  LinkStep,
  DoneStep,
} from './components'

export function HomePage() {
  const { isConnected } = useAccount()
  const [step, setStep] = useState<Step>(Step.Connect)

  useEffect(() => {
    if (!isConnected && step !== Step.Connect) {
      setStep(Step.Connect)
    } else if (isConnected && step === Step.Connect) {
      setStep(Step.Delegate)
    }
  }, [isConnected, step])

  const renderStep = () => {
    switch (step) {
      case Step.Connect:
        return <ConnectStep />
      case Step.Delegate:
        return <DelegateStep onComplete={() => setStep(Step.Link)} />
      case Step.Link:
        return <LinkStep onComplete={() => setStep(Step.Done)} />
      case Step.Done:
        return <DoneStep />
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#FF007A]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#7B3FE4]/20 rounded-full blur-[120px]" />
      </div>
      <Card className="glass-card w-full max-w-md relative">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold gradient-text">
            DAO Voting
          </CardTitle>
          <p className="text-white/40 text-sm">Set up your wallet to vote</p>
        </CardHeader>
        <CardContent className="pt-4">
          <StepIndicator currentStep={step} />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  )
}
