// next.config.mjs — ESM válido + next-pwa + typedRoutes desativado

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  experimental: {
    typedRoutes: false, // evita os erros chatos de tipagem de rotas
  },
  images: {
    unoptimized: true,  // compatível com Vercel estático e <Image fill>
  },
  reactStrictMode: true,
  swcMinify: true,
  // Se você tiver outras flags (headers, rewrites, etc.), pode mantê-las aqui
};

// Config do PWA (usa a mesma que já aparece nos seus logs)
const withPWAFn = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production', // liga só em produção
});

const nextConfig = withPWAFn(baseConfig);

export default nextConfig;
