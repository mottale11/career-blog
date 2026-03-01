import { OpportunityForm } from '../_components/opportunity-form';
import { getCategories } from '@/lib/categories';
import { getIndustries } from "@/lib/industries";
import { getFields } from "@/lib/fields";
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function NewOpportunityPage() {
  const [categories, industries, fields] = await Promise.all([
    getCategories(),
    getIndustries(),
    getFields()
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Create New Opportunity</h1>
        <Button asChild variant="ghost" size="icon" aria-label="Close">
          <Link href="/admin/opportunities">
            <X className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <OpportunityForm
        categories={categories}
        industries={industries}
        fields={fields}
      />
    </div>
  );
}
