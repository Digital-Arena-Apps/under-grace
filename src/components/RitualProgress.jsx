import { BookOpen, Check, Circle, Moon, PenLine, RotateCcw } from 'lucide-react'

export default function RitualProgress({ repeatCount, actionSet, reflectionSet }) {
  const steps = [
    {
      label: 'Read',
      detail: 'Begin with the mantra',
      icon: BookOpen,
      complete: true,
    },
    {
      label: 'Repeat',
      detail: `${Math.min(repeatCount, 3)} of 3 complete`,
      icon: RotateCcw,
      complete: repeatCount >= 3,
    },
    {
      label: 'Act',
      detail: actionSet ? 'One action saved' : 'Choose one action',
      icon: PenLine,
      complete: actionSet,
    },
    {
      label: 'Reflect',
      detail: reflectionSet ? 'Reflection noted' : 'Return this evening',
      icon: Moon,
      complete: reflectionSet,
    },
  ]

  return (
    <section className="mb-4 rounded-lg border border-white/60 bg-white/60 p-3 shadow-calm shadow-innerCalm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:mb-5 sm:p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <ProgressStep key={step.label} index={index + 1} {...step} />
        ))}
      </div>
    </section>
  )
}

function ProgressStep({ index, label, detail, icon: Icon, complete }) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 transition ${
        complete
          ? 'border-sage/30 bg-sage/10 text-cedar dark:border-sage/25 dark:bg-sage/10 dark:text-shell'
          : 'border-sage/20 bg-pearl/60 text-cedar/70 dark:border-white/10 dark:bg-dusk/40 dark:text-shell/60'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/60 shadow-innerCalm dark:bg-white/10">
          <Icon className="h-4 w-4" />
        </span>
        {complete ? <Check className="h-4 w-4 text-sage" /> : <Circle className="h-4 w-4 opacity-55" />}
      </div>
      <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] opacity-70">Step {index}</p>
      <p className="mt-1 font-semibold text-ink dark:text-pearl">{label}</p>
      <p className="mt-1 text-xs leading-5 opacity-75">{detail}</p>
    </div>
  )
}
