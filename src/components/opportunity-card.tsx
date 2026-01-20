import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Opportunity } from '@/lib/types';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/opportunity/${opportunity.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={opportunity.image}
            alt={opportunity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={opportunity.imageHint}
          />
           <Badge className="absolute top-2 right-2" variant={opportunity.category === 'Career Advice' || opportunity.category === 'Study Abroad' ? 'secondary' : 'default'}>{opportunity.category}</Badge>
        </div>
      </Link>
      <CardHeader>
        <Link href={`/opportunity/${opportunity.slug}`} className="block">
          <CardTitle className="font-headline text-lg leading-snug hover:text-primary transition-colors">
            {opportunity.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-2">{opportunity.organization}</p>
        <div className="flex items-start gap-2 mb-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0"/>
            <span>{opportunity.location}, {opportunity.country}</span>
        </div>
        <p className="line-clamp-3">{opportunity.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm border-t pt-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(opportunity.deadline)}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/opportunity/${opportunity.slug}`}>
            Details <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
