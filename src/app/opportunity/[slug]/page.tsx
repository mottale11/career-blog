import { getOpportunityBySlug, getOpportunities } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  Calendar,
  Globe,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { OpportunitySummary } from '@/components/opportunity-summary';
import { OpportunityCard } from '@/components/opportunity-card';
import { ShareButton } from '@/components/share-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type OpportunityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const opportunities = await getOpportunities();
  return opportunities.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const resolvedParams = await params;
  const opportunity = await getOpportunityBySlug(resolvedParams.slug);

  if (!opportunity) {
    notFound();
  }

  const similarOpportunities = (await getOpportunities(opportunity.category))
    .filter((op) => op.id !== opportunity.id)
    .slice(0, 6);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <article>
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image
                src={opportunity.image}
                alt={opportunity.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 67vw"
                data-ai-hint={opportunity.imageHint}
                priority
              />
            </div>

            <Badge variant={opportunity.category === 'Career Advice' || opportunity.category === 'Study Abroad' ? 'secondary' : 'default'} className="mb-2">{opportunity.category}</Badge>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              {opportunity.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{opportunity.organization}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{opportunity.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{opportunity.level}</span>
              </div>
            </div>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'JobPosting',
                  title: opportunity.title,
                  description: opportunity.description,
                  identifier: {
                    '@type': 'PropertyValue',
                    name: opportunity.organization,
                    value: opportunity.id,
                  },
                  datePosted: opportunity.created_at,
                  validThrough: opportunity.deadline,
                  hiringOrganization: {
                    '@type': 'Organization',
                    name: opportunity.organization,
                  },
                  jobLocation: {
                    '@type': 'Place',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: opportunity.location,
                      addressCountry: opportunity.country,
                    },
                  },
                }),
              }}
            />

            <Separator className="my-8" />

            <OpportunitySummary description={opportunity.description} />

            <div
              className="prose max-w-none mt-8 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: opportunity.description }}
            />

            {opportunity.tags && opportunity.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-headline text-xl font-bold mb-4">
                  Related Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  Opportunity Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Application Deadline</p>
                    <p className="text-muted-foreground">
                      {formatDate(opportunity.deadline)}
                    </p>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                    Apply Now <LinkIcon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  Share this Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShareButton
                  title={opportunity.title}
                  text={`Check out this opportunity: ${opportunity.title}`}
                />
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {similarOpportunities.length > 0 && (
        <section className="mt-12 pt-12 border-t">
          <h2 className="font-headline text-3xl font-bold mb-6">
            Similar Opportunities
          </h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {similarOpportunities.map((op) => (
                <CarouselItem key={op.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <OpportunityCard opportunity={op} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </section>
      )}
    </div>
  );
}
