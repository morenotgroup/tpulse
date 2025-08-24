import config from '@/data/config.json'

export default function Page() {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold">Manuais</h1>
      <p className="text-sm text-[color:var(--muted)] mb-3">PDFs e orientações essenciais.</p>
      <ul className="space-y-3">
        {config.manuais.map((m) => (
          <li key={m.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-xs text-[color:var(--muted)]">PDF</div>
              </div>
              <a
                href={m.url}
                className="btn text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
