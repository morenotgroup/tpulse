// lib/mailer.ts
import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
} = process.env

// Transporter SMTP
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 465),
  secure: (SMTP_SECURE ?? 'true') === 'true', // 465 geralmente true
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
})

/**
 * Envia o e-mail com link mágico de login.
 * @param to         E-mail do colaborador
 * @param loginUrl   URL completa do callback
 * @param displayName (opcional) nome para personalizar o assunto/corpo
 */
export async function sendMagicLink(to: string, loginUrl: string, displayName?: string) {
  const from = MAIL_FROM || 'T Group Intra <no-reply@tgroup.com>'
  const nome = (displayName || '').trim()
  const saudacao = nome ? `Olá, ${nome}!` : 'Olá!'

  const subject = 'Seu acesso ao T Group Intra'
  const text =
`${saudacao}

Use este link para entrar no app do T Group:
${loginUrl}

O link expira em 15 minutos. Se não foi você, ignore este e-mail.`

  const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5; color:#111; max-width:560px; margin:0 auto; padding:24px;">
    <h2 style="margin:0 0 12px 0;">${saudacao}</h2>
    <p style="margin:0 0 16px 0;">Use o botão abaixo para entrar no <b>T Group Intra</b>.</p>
    <p style="margin:0 0 20px 0;">
      <a href="${loginUrl}"
         style="display:inline-block; background:#111827; color:#fff; text-decoration:none; padding:12px 18px; border-radius:10px;">
        Entrar agora
      </a>
    </p>
    <p style="font-size:13px; color:#555; margin:0 0 6px 0;">O link expira em 15 minutos.</p>
    <p style="font-size:12px; color:#777; margin:0;">Se o botão não funcionar, copie e cole no navegador:</p>
    <p style="font-size:12px; color:#4b5563; word-break:break-all; margin:8px 0 0 0;">${loginUrl}</p>
  </div>`

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  })
}
