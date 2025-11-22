import { Step } from '@/types'

interface StepIndicatorProps {
  currentStep: Step
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { step: Step.Connect, label: 'Connect' },
    { step: Step.Delegate, label: 'Delegate' },
    { step: Step.Link, label: 'Link' },
    { step: Step.Done, label: 'Done' },
  ]

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map(({ step, label }, index) => {
        const isCompleted = currentStep > step
        const isActive = currentStep === step
        const isPending = currentStep < step

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`step-indicator ${
                  isCompleted
                    ? 'step-completed'
                    : isActive
                      ? 'step-active'
                      : 'step-pending'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={`text-xs mt-1 ${
                  isActive
                    ? 'text-white'
                    : isPending
                      ? 'text-white/40'
                      : 'text-white/60'
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  currentStep > step ? 'bg-green-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
