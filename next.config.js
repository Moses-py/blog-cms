/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io"],
  },
  headers: () => [
    {
      source: "/",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  generateEtags: false,
};

module.exports = nextConfig;
