/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false, // 👈 desliga rotas tipadas para evitar erros chato
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
