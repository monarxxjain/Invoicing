/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PINATA_KEY: process.env.PINATA_KEY,
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
