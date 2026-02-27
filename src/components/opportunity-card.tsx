import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Opportunity } from '@/lib/types';
import { ArrowRight, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';
import { TagBadge } from './tag-badge';

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 text-sm">
      <CardHeader className="pb-2">
        {/* Tags row at the top */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(opportunity.employmentType ?? []).slice(0, 2).map((type) => (
            <TagBadge key={type} label={type} />
          ))}
        </div>

        {/* Title */}
        <Link href={`/opportunity/${opportunity.slug}`} className="block">
          <CardTitle className="font-headline text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
            {opportunity.title}
          </CardTitle>
        </Link>

        {/* Organization · Location */}
        <p className="text-xs text-muted-foreground mt-1">
          <span className="font-semibold text-foreground">{opportunity.organization}</span>
          {opportunity.location && (
            <span> · {opportunity.location}{opportunity.country ? `, ${opportunity.country}` : ''}</span>
          )}
        </p>
      </CardHeader>

      <CardContent className="flex-grow text-xs text-muted-foreground space-y-2">
        {/* Summary */}
        <p className="line-clamp-3">{opportunity.summary}</p>

        {/* Skills / Tags */}
        {opportunity.tags && opportunity.tags.length > 0 && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Skills · </span>
            {opportunity.tags.slice(0, 4).join(' · ')}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center text-xs border-t pt-3">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Posted {formatDate(opportunity.created_at ?? '')}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/opportunity/${opportunity.slug}`}>
            View Details <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
