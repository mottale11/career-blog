import { OpportunityForm } from '../_components/opportunity-form';
import { getCategories } from '@/lib/categories';
import { getIndustries } from "@/lib/industries";
import { getFields } from "@/lib/fields";

export const dynamic = 'force-dynamic';

export default async function NewOpportunityPage() {
  const [categories, industries, fields] = await Promise.all([
    getCategories(),
    getIndustries(),
    getFields()
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-8">Create New Opportunity</h1>
      <OpportunityForm
        categories={categories}
        industries={industries}
        fields={fields}
      />
    </div>
  );
}
