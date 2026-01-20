import { CategoryLinks } from '@/components/category-links';
import { Hero } from '@/components/hero';
import { NewsletterForm } from '@/components/newsletter-form';
import { OpportunityListSection } from '@/components/opportunity-list-section';
import { getOpportunities } from '@/lib/data';

export default async function Home() {
  const allOpportunities = await getOpportunities();
  const featuredOpportunities = allOpportunities.filter((o) => o.featured);
  const trendingOpportunities = allOpportunities.filter((o) => o.trending);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="container mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CategoryLinks />
        <OpportunityListSection
          title="Featured Opportunities"
          opportunities={featuredOpportunities}
          className="mt-12"
        />
        <OpportunityListSection
          title="Trending Now"
          opportunities={trendingOpportunities}
          className="mt-12"
        />
        <NewsletterForm className="mt-16" />
      </div>
    </div>
  );
}
