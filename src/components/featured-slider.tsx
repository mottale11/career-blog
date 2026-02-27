'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OpportunityCard } from './opportunity-card';
import type { Opportunity } from '@/lib/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type FeaturedSliderProps = {
    title: string;
    opportunities: Opportunity[];
    className?: string;
};

const VISIBLE = 4; // cards visible at once

export function FeaturedSlider({ title, opportunities, className }: FeaturedSliderProps) {
    const [index, setIndex] = React.useState(0);

    if (opportunities.length === 0) return null;

    const max = Math.max(0, opportunities.length - VISIBLE);

    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(max, i + 1));

    const translateX = `translateX(calc(-${index} * (100% / ${VISIBLE} + 1rem / ${VISIBLE})))`;

    return (
        <section className={cn(className)}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold font-headline">{title}</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prev}
                        disabled={index === 0}
                        aria-label="Previous"
                        className="h-8 w-8 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={next}
                        disabled={index >= max}
                        aria-label="Next"
                        className="h-8 w-8 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Slider track */}
            <div className="overflow-hidden">
                <div
                    className="flex gap-4 transition-transform duration-300 ease-in-out"
                    style={{ transform: translateX }}
                >
                    {opportunities.map((opportunity) => (
                        <div
                            key={opportunity.id}
                            className="min-w-0 flex-shrink-0"
                            style={{ width: `calc((100% - ${VISIBLE - 1} * 1rem) / ${VISIBLE})` }}
                        >
                            <OpportunityCard opportunity={opportunity} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot indicators */}
            {opportunities.length > VISIBLE && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {Array.from({ length: max + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-200',
                                i === index ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30'
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
