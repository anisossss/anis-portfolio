const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

module.exports = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
  
  pwa: {
    dest: "public",
    // register: true,
    // skipWaiting: true,
    // disable: process.env.NODE_ENV === "development",
  },
  
});
