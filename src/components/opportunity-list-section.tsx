import type { Opportunity } from '@/lib/types';
import { OpportunityCard } from './opportunity-card';
import { cn } from '@/lib/utils';

type OpportunityListSectionProps = {
  title: string;
  opportunities: Opportunity[];
  className?: string;
};

export function OpportunityListSection({
  title,
  opportunities,
  className,
}: OpportunityListSectionProps) {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className={cn(className)}>
      <h2 className="text-3xl font-bold font-headline mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
