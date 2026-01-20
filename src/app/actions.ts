'use server';

import { summarizeOpportunityDetails } from '@/ai/flows/summarize-opportunity-details';
import { personalizedOpportunityRecommendations } from '@/ai/flows/personalized-opportunity-recommendations';
import type { Opportunity } from './lib/types';

export async function getSummary(opportunityDetails: string) {
  try {
    const result = await summarizeOpportunityDetails({ opportunityDetails });
    return result.summary;
  } catch (error) {
    console.error('Error summarizing opportunity:', error);
    return 'Could not generate summary at this time.';
  }
}

export async function getRecommendations(userProfile: string, opportunities: Opportunity[]) {
  const opportunitiesString = opportunities.map(o => `Title: ${o.title}\nSummary: ${o.summary}\n`).join('\n---\n');
  try {
    const result = await personalizedOpportunityRecommendations({ userProfile, opportunities: opportunitiesString });
    // This is a simplified parsing. A real app might want a structured JSON output from the AI.
    const recommendedTitles = result.recommendations.split('\n').map(line => line.replace(/^- /, '').trim());
    return opportunities.filter(o => recommendedTitles.some(t => o.title.includes(t)));
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}
