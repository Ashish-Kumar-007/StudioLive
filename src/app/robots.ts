import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.studiolive.example.com' // Replace with actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/book', '/admin', '/account'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
