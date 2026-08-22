import { MetadataRoute } from 'next'
import { services, portfolio } from '@/lib/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.studiolive.example.com' // Replace with actual domain

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/portfolio',
    '/packages',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const portfolioPages = portfolio.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...portfolioPages]
}
