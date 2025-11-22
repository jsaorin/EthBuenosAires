import { Button } from '@/components/ui/button'

export function DoneStep() {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold gradient-text">All set!</h2>
        <p className="text-white/60">You can now vote from Telegram</p>
      </div>

      <Button
        onClick={() => window.open('https://t.me/your_group', '_blank')}
        className="uniswap-button"
      >
        Join Telegram group
      </Button>
    </div>
  )
}
