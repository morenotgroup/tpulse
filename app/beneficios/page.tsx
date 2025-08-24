import config from '@/data/config.json'

export default function Page() {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold">Benefícios</h1>
      <p className="text-sm text-[color:var(--muted)] mb-3">Parcerias e vantagens ativas.</p>
      <div className="space-y-3">
        {config.beneficios.map((b) => (
          <div key={b.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-[color:var(--muted)]">{b.subtitle}</div>
              </div>
              <a
                href={b.url}
                className="btn text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {b.cta}
              </a>
            </div>
            <p className="text-sm mt-2">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
