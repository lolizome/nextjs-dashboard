import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://nextjs-dashboard-nine-psi-50.vercel.app' : 'http://localhost:3000';
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    }
  ];

  return [...routes];
}
