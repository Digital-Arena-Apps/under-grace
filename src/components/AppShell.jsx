export default function AppShell({ children }) {
  return (
    <div className="min-h-screen overflow-hidden bg-ivory text-ink transition-colors duration-500 dark:bg-dusk dark:text-pearl">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,151,126,0.24),transparent_32rem),linear-gradient(135deg,rgba(249,246,239,0.95),rgba(239,231,218,0.8)_45%,rgba(184,131,92,0.14))] dark:bg-[radial-gradient(circle_at_top_left,rgba(132,151,126,0.22),transparent_31rem),linear-gradient(135deg,rgba(37,44,45,1),rgba(42,51,49,0.95)_48%,rgba(185,131,92,0.16))]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
