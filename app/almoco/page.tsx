import config from '@/data/config.json'

export default function Page() {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold mb-3">Check-in do Almoço</h1>
      <div className="card">
        <iframe
          src={config.almocoUrl}
          className="w-full h-[70vh] rounded-lg"
          allow="clipboard-write; clipboard-read"
        />
      </div>
      <p className="text-xs text-[color:var(--muted)] mt-2">
        Se a tela não carregar no app, toque em “Abrir no navegador”.
      </p>
    </div>
  )
}
