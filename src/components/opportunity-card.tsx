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
  // Provide a fallback image if image URL is empty, invalid, or problematic
  const imageUrl = opportunity.image && 
    opportunity.image.trim() !== '' && 
    !opportunity.image.includes('data:image/png;base64,') &&
    opportunity.image !== 'null' &&
    opportunity.image !== 'undefined'
    ? opportunity.image 
    : `https://picsum.photos/seed/${opportunity.slug}/400/250`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 text-sm">
      <Link href={`/opportunity/${opportunity.slug}`} className="block">
        <div className="relative h-32 w-full">
          <Image
            src={imageUrl}
            alt={opportunity.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            data-ai-hint={opportunity.imageHint || `Image for ${opportunity.title}`}
            unoptimized={false}
          />
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            {Array.isArray(opportunity.category) ? (
              <>
                {opportunity.category.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant={cat === 'Career Advice' || cat === 'Study Abroad' ? 'secondary' : 'default'} className="shadow-sm text-xs">
                    {cat}
                  </Badge>
                ))}
                {opportunity.category.length > 2 && (
                  <Badge variant="secondary" className="shadow-sm text-xs">+{opportunity.category.length - 2}</Badge>
                )}
              </>
            ) : (
              <Badge className="" variant={opportunity.category === 'Career Advice' || opportunity.category === 'Study Abroad' ? 'secondary' : 'default'}>{opportunity.category}</Badge>
            )}
          </div>
        </div>
      </Link>
      <CardHeader className="pb-3">
        <Link href={`/opportunity/${opportunity.slug}`} className="block">
          <CardTitle className="font-headline text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
            {opportunity.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">{opportunity.organization}</p>
        <div className="flex items-start gap-1 mb-1">
          <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{opportunity.location}, {opportunity.country}</span>
        </div>
        <p className="line-clamp-2">{opportunity.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs border-t pt-3">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(opportunity.deadline)}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/opportunity/${opportunity.slug}`}>
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
