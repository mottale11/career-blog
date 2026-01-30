import { getOpportunityById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { OpportunityForm } from '../../_components/opportunity-form';

export default async function EditOpportunityPage({ params }: { params: { id: string } }) {
  const opportunity = await getOpportunityById(params.id);

  if (!opportunity) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold font-headline mb-6">Edit Opportunity</h2>
      <OpportunityForm opportunity={opportunity} />
    </div>
  );
}
