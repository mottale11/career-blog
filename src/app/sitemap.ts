import { MetadataRoute } from 'next';
import { getAllOpportunities } from '@/lib/data';
import { categories } from '@/lib/data';
import { slugify } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://jobsyde.com';

    // Static pages
    const routes = [
        '',
        '/foryou',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // Category pages
    const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/opportunities/${slugify(category.name)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // Opportunity pages
    const opportunities = await getAllOpportunities();
    const opportunityRoutes = opportunities.map((opportunity) => ({
        url: `${baseUrl}/opportunity/${opportunity.slug}`,
        lastModified: new Date(opportunity.created_at || new Date()), // Fallback if created_at is missing
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...categoryRoutes, ...opportunityRoutes];
}
