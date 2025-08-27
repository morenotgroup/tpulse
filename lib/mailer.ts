import nodemailer from 'nodemailer'

export function getTransport() {
  const host = process.env.SMTP_HOST!
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = String(process.env.SMTP_SECURE || 'true') === 'true'
  const user = process.env.SMTP_USER!
  const pass = process.env.SMTP_PASS!

  return nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass }
  })
}

export async function sendMagicLink(to: string, url: string) {
  const from = process.env.MAIL_FROM || 'no-reply@tgroup.com'
  const transport = getTransport()
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
      <h2>T Group Intra</h2>
      <p>Olá! Para entrar no app, clique no botão abaixo:</p>
      <p><a href="${url}" style="display:inline-block;padding:12px 16px;background:#7C3AED;color:#fff;border-radius:10px;text-decoration:none;">Entrar</a></p>
      <p>Ou copie e cole este link no navegador:</p>
      <code style="word-break:break-all;">${url}</code>
      <p style="color:#777">Este link expira em 15 minutos.</p>
    </div>
  `
  await transport.sendMail({
    from, to,
    subject: 'Seu acesso ao T Group Intra',
    html
  })
}
