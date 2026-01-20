'use client';

import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import type { Opportunity } from '@/lib/types';
import { getRecommendations } from '@/app/actions';
import { OpportunityCard } from './opportunity-card';
import { Card, CardContent } from './ui/card';
import { Sparkles } from 'lucide-react';
import { Label } from './ui/label';

export function PersonalizedRecommendations({ opportunities }: { opportunities: Opportunity[] }) {
  const [profile, setProfile] = useState(
    'I am a final year computer science student with experience in Python, JavaScript, and React. I am interested in software engineering internships at top tech companies. I have a GPA of 3.8.'
  );
  const [recommendations, setRecommendations] = useState<Opportunity[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await getRecommendations(profile, opportunities);
      setRecommendations(result);
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <Label htmlFor="profile" className="text-lg font-semibold font-headline">Your Profile & Interests</Label>
                <p className="text-sm text-muted-foreground mb-2">Describe your skills, experience, and what you're looking for. The more detail, the better the recommendations!</p>
                <Textarea
                  id="profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="e.g., I am a marketing professional with 5 years of experience in digital strategy..."
                  rows={5}
                />
             </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Analyzing...' : 'Get Recommendations'}
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isPending && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card border rounded-lg shadow-sm">
                  <div className="h-48 w-full bg-muted animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                </div>
            ))}
        </div>
      )}

      {!isPending && recommendations.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold font-headline mb-6">
            Here are your top matches:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      )}
      
      {!isPending && recommendations.length === 0 && (
         <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h2 className="text-xl font-semibold">Your Recommendations Will Appear Here</h2>
          <p className="text-muted-foreground mt-2">
            Fill out your profile above and click the button to get started.
          </p>
        </div>
      )}

    </div>
  );
}
