/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100% estatico (export) conforme briefing, deploy simples na Vercel.
  output: "export",
  // Export estatico nao usa o otimizador de imagem do Next.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
