/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PINATA_KEY: process.env.PINATA_KEY,
    PINATA_BASE_URL: process.env.PINATA_BASE_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
