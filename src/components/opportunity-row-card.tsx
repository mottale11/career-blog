import Link from 'next/link';
import type { Opportunity } from '@/lib/types';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';
import { TagBadge } from './tag-badge';

type OpportunityRowCardProps = {
    opportunity: Opportunity;
};

export function OpportunityRowCard({ opportunity }: OpportunityRowCardProps) {
    const categories = Array.isArray(opportunity.category)
        ? opportunity.category.slice(0, 2)
        : [opportunity.category];

    const empTypes = (opportunity.employmentType ?? []).slice(0, 1);

    return (
        <div className="flex items-start gap-4 border rounded-lg px-5 py-4 bg-card transition-all hover:shadow-md hover:-translate-y-0.5 text-sm">
            {/* Left: tags + title + org/location */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {categories.map((cat) => (
                        <TagBadge key={cat} label={cat} />
                    ))}
                    {empTypes.map((type) => (
                        <TagBadge key={type} label={type} />
                    ))}
                </div>

                <Link href={`/opportunity/${opportunity.slug}`}>
                    <h3 className="font-semibold text-sm leading-snug hover:text-primary transition-colors line-clamp-1">
                        {opportunity.title}
                    </h3>
                </Link>

                <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium text-foreground">{opportunity.organization}</span>
                    {opportunity.location && (
                        <span className="inline-flex items-center gap-0.5 ml-2">
                            <MapPin className="w-3 h-3 inline" />
                            {opportunity.location}{opportunity.country ? `, ${opportunity.country}` : ''}
                        </span>
                    )}
                </p>
            </div>

            {/* Center: summary */}
            <p className="hidden md:block flex-[2] text-xs text-muted-foreground line-clamp-2 self-center">
                {opportunity.summary}
            </p>

            {/* Right: date + button */}
            <div className="flex flex-col items-end gap-2 shrink-0 self-center">
                <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <Calendar className="w-3 h-3" />
                    {formatDate(opportunity.created_at ?? '')}
                </span>
                <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                    <Link href={`/opportunity/${opportunity.slug}`}>
                        View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
