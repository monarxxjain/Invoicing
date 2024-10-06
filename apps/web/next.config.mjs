/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PINATA_KEY: process.env.PINATA_KEY,
    PINATA_BASE_URL: process.env.PINATA_BASE_URL
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://invoicing-web.vercel.app", // Replace with your frontend domain
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
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
