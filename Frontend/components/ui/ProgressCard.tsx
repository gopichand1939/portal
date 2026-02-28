import { cn } from '@/lib/utils'

interface ProgressCardProps {
  title: string
  progress: number
  color?: string
  className?: string
}

export default function ProgressCard({
  title,
  progress,
  color = 'bg-primary-600',
  className,
}: ProgressCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <span className="text-sm font-semibold text-gray-900">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn('h-full transition-all duration-500', color)}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}


