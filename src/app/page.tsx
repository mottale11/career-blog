import { FilterBar } from '@/components/filter-bar';
import { Hero } from '@/components/hero';
import { NewsletterForm } from '@/components/newsletter-form';
import { OpportunityListSection } from '@/components/opportunity-list-section';
import { getOpportunities } from '@/lib/data';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams;

  // Cast searchParams values to string or undefined to match getOpportunities signature
  const filters = {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
    industry: typeof searchParams.industry === 'string' ? searchParams.industry : undefined,
    remote: typeof searchParams.remote === 'string' ? searchParams.remote : undefined,
    level: typeof searchParams.level === 'string' ? searchParams.level : undefined,
  };

  const allOpportunities = await getOpportunities(filters);
  const featuredOpportunities = allOpportunities.filter((o) => o.featured);
  const trendingOpportunities = allOpportunities.filter((o) => o.trending);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="container mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <FilterBar />
        <OpportunityListSection
          title="Hiring Now"
          opportunities={featuredOpportunities}
          className="mt-12"
        />
        <OpportunityListSection
          title="Featured Opportunities"
          opportunities={trendingOpportunities}
          className="mt-12"
        />
        <NewsletterForm className="mt-16" />
      </div>
    </div>
  );
}
