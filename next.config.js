/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: 'images.unsplash.com'
        },
        {
            protocol: "https",
            hostname: 's3.us-west-2.amazonaws.com'
        },
        {
          protocol: "https",
          hostname: 'oaidalleapiprodscus.blob.core.windows.net'
      },

    ]
  }
};

module.exports = nextConfig;
