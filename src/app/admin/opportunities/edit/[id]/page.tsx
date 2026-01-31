import { getOpportunityById } from '@/lib/data';
import { getCategories } from '@/lib/categories';
import { notFound } from 'next/navigation';
import { OpportunityForm } from '../../_components/opportunity-form';

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [opportunity, categories] = await Promise.all([
    getOpportunityById(resolvedParams.id),
    getCategories()
  ]);

  if (!opportunity) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">Edit Opportunity</h2>
      <OpportunityForm opportunity={opportunity} categories={categories} />
    </div>
  );
}
