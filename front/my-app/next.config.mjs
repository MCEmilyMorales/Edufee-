/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "cdn.auth0.com",
      "res.cloudinary.com",
      "thispersondoesnotexist.com",
    ],
  },
};

export default nextConfig;
