import { getOpportunities } from '@/lib/data';
import type { Opportunity } from '@/lib/types';
import { OpportunityCard } from '@/components/opportunity-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { Suspense } from 'react';

type SearchParams = {
  q?: string;
  category?: string;
  country?: string;
  level?: string;
  industry?: string;
};

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterSidebar />
      <div className="w-full">
        <Suspense fallback={<OpportunityGridSkeleton />}>
          <OpportunityGrid searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function OpportunityGrid({ searchParams }: { searchParams: SearchParams }) {
  // Map search params to data fetching filters
  const filters = {
    category: searchParams.category,
    location: searchParams.country,
    level: searchParams.level,
    industry: searchParams.industry,
  };

  let opportunities = await getOpportunities(filters);

  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    opportunities = opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes(query) ||
        o.summary.toLowerCase().includes(query) ||
        o.organization.toLowerCase().includes(query)
    );
  }

  const title = searchParams.q
    ? `Search results for "${searchParams.q}"`
    : 'All Opportunities';

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">{title}</h1>
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h2 className="text-xl font-semibold">No Opportunities Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

function OpportunityGridSkeleton() {
  return (
    <div>
      <div className="h-9 w-2/3 bg-muted rounded animate-pulse mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-card border rounded-lg shadow-sm">
            <div className="h-32 w-full bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="px-4 pb-3 border-t pt-3 flex justify-between items-center">
              <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-6 w-1/4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
