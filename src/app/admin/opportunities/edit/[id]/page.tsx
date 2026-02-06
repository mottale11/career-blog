import { getOpportunityById } from '@/lib/data';
import { getCategories } from '@/lib/categories';
import { getIndustries } from "@/lib/industries";
import { getFields } from "@/lib/fields";
import { notFound } from 'next/navigation';
import { OpportunityForm } from '../../_components/opportunity-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EditOpportunityPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function EditOpportunityPage({ params }: EditOpportunityPageProps) {
  const { id } = await params;
  const [opportunity, categories, industries, fields] = await Promise.all([
    getOpportunityById(id),
    getCategories(),
    getIndustries(),
    getFields()
  ]);

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">Edit Opportunity</h1>
        <Link href="/admin/opportunities">
          <Button variant="ghost" size="icon">
            <X className="h-6 w-6" />
            <span className="sr-only">Cancel</span>
          </Button>
        </Link>
      </div>
      <OpportunityForm
        opportunity={opportunity}
        categories={categories}
        industries={industries}
        fields={fields}
      />
    </div>
  );
}
