import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingLines } from '@/components/floating-lines'
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <div className="fixed inset-0 z-0">
        <FloatingLines
          enabledWaves={['middle', 'bottom']}
          lineCount={[4, 2]}
          lineDistance={[8, 6]}
          animationSpeed={0.8}

          parallax={true}
          parallaxStrength={0.15}
          mixBlendMode="normal"
        />
      </div>
      <Card className="w-full max-w-md relative z-10 bg-[#131313] border-white/10 rounded-3xl">
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
