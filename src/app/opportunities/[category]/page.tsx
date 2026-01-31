import { getOpportunities } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunity-card';
import { slugify } from '@/lib/utils';
import type { Category } from '@/lib/types';
import { categories } from '@/lib/data';
import { notFound } from 'next/navigation';

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: slugify(category.name),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryName = categories.find(
    (c) => slugify(c.name) === resolvedParams.category
  )?.name;

  if (!categoryName) {
    notFound();
  }

  const opportunities = await getOpportunities(categoryName);

  return (
    <div>
      <h1 className="text-4xl font-bold font-headline mb-8">{categoryName}</h1>
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h2 className="text-xl font-semibold">No Opportunities Found in this Category</h2>
          <p className="text-muted-foreground mt-2">
            Please check back later or explore other categories.
          </p>
        </div>
      )}
    </div>
  );
}
