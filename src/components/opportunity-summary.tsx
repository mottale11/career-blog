'use client';

import { getSummary } from '@/app/actions';
import { Sparkles } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

export function OpportunitySummary({ description }: { description: string }) {
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getSummary(description);
      setSummary(result);
    });
  }, [description]);

  return (
    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
      <h2 className="font-headline text-xl font-bold flex items-center gap-2">
        <Sparkles className="text-accent" />
        AI-Powered Summary
      </h2>
      {isPending && (
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
        </div>
      )}
      {summary && !isPending && <p className="mt-4 text-foreground/80">{summary}</p>}
    </div>
  );
}
