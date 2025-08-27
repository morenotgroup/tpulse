// app/login/page.tsx
import LoginForm from '@/components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login — T Group Intra',
}

export default function LoginPage() {
  return (
    <main className="p-6 space-y-5">
      <header>
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Digite seu e-mail corporativo e (opcional) seu nome completo.
        </p>
      </header>

      <LoginForm />
    </main>
  )
}
