/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["c1.neweggimages.com"], // Add other domains as needed
  },
  reactStrictMode: false,
  experimental: {
    runtime: "nodejs",
  },
};

export default nextConfig;
