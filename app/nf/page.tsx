import Link from 'next/link'
import config from '@/data/config.json'

export default function Page() {
  return (
    <div className="px-4 pt-5 pb-24">
      <h1 className="text-xl font-semibold mb-2">NF Express</h1>
      <div className="card">
        <p className="text-sm">Envie sua nota do mês pelo link abaixo:</p>
        <Link
          href={config.nfLink}
          className="btn mt-3 w-full text-center"
          target="_blank"
        >
          Enviar nota fiscal
        </Link>
        <p className="text-xs text-[color:var(--muted)] mt-3">
          O link é atualizado mensalmente por Gente & Cultura.
        </p>
      </div>
    </div>
  )
}
