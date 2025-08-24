import config from '@/data/config.json'

export default function Page() {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold">Capacitar</h1>
      <p className="text-sm text-[color:var(--muted)] mb-3">Cursos e trilhas recomendadas.</p>
      <div className="grid grid-cols-1 gap-3">
        {config.capacitar.map((c) => (
          <div key={c.title} className="card">
            <div className="font-semibold">{c.title}</div>
            <a
              href={c.url}
              className="btn mt-3 w-full text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
