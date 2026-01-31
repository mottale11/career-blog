import { getOpportunities } from '@/lib/data';
import type { Opportunity } from '@/lib/types';
import { OpportunityCard } from '@/components/opportunity-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { Suspense } from 'react';

type SearchParams = {
  q?: string;
  country?: string;
  level?: string;
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
  let opportunities = await getOpportunities();

  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    opportunities = opportunities.filter(
      (o) =>
        o.title.toLowerCase().includes(query) ||
        o.summary.toLowerCase().includes(query) ||
        o.organization.toLowerCase().includes(query)
    );
  }

  if (searchParams.country && searchParams.country !== 'all') {
    opportunities = opportunities.filter(o => o.country === searchParams.country);
  }

  if (searchParams.level && searchParams.level !== 'all') {
    opportunities = opportunities.filter(o => o.level === searchParams.level);
  }

  const title = searchParams.q
    ? `Search results for "${searchParams.q}"`
    : 'All Opportunities';

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">{title}</h1>
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card border rounded-lg shadow-sm">
            <div className="h-48 w-full bg-muted animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="px-6 pb-4 border-t pt-4 flex justify-between items-center">
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              <div className="h-8 w-1/4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
