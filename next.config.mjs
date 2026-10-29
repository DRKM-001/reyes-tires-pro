/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site in out/, served by Cloudflare Pages.
  // Backend endpoints live in /functions (Cloudflare Pages Functions), not in Next.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
