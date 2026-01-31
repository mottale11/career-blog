import { OpportunityForm } from '../_components/opportunity-form';
import { getCategories } from '@/lib/categories';

export default async function NewOpportunityPage() {
  const categories = await getCategories();

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">Create New Opportunity</h2>
      <OpportunityForm categories={categories} />
    </div>
  );
}
