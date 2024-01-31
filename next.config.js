// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
      return [
          {
              // matching all API routes
              source: "/:path*",
              headers: [
                
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "*" },
              ]
          }
      ]
  }
}


// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
//   });
  
  // module.exports = {...withPWA({
  //   reactStrictMode: true,
  // }), ...nextConfig}
  
  module.exports = nextConfig
