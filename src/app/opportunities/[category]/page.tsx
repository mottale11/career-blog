import { getOpportunities, getCategories } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunity-card';
import { slugify } from '@/lib/utils';
import type { Category } from '@/lib/types';
import { notFound } from 'next/navigation';

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category: Category) => ({
    category: slugify(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categories = await getCategories();
  const categoryName = categories.find(
    (c: Category) => slugify(c) === resolvedParams.category
  );

  if (!categoryName) {
    notFound();
  }

  const opportunities = await getOpportunities({ category: categoryName });

  return (
    <div>
      <h1 className="text-4xl font-bold font-headline mb-8">{categoryName}</h1>
      {opportunities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
