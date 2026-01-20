'use server';

/**
 * @fileOverview A personalized opportunity recommendation AI agent.
 *
 * - personalizedOpportunityRecommendations - A function that handles the opportunity recommendation process.
 * - PersonalizedOpportunityRecommendationsInput - The input type for the personalizedOpportunityRecommendations function.
 * - PersonalizedOpportunityRecommendationsOutput - The return type for the personalizedOpportunityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedOpportunityRecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including interests, qualifications, and experience.'),
  opportunities: z
    .string()
    .describe('A list of opportunities, with title, summary, and other details.'),
});
export type PersonalizedOpportunityRecommendationsInput = z.infer<
  typeof PersonalizedOpportunityRecommendationsInputSchema
>;

const PersonalizedOpportunityRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended opportunities based on the user profile.'),
});
export type PersonalizedOpportunityRecommendationsOutput = z.infer<
  typeof PersonalizedOpportunityRecommendationsOutputSchema
>;

export async function personalizedOpportunityRecommendations(
  input: PersonalizedOpportunityRecommendationsInput
): Promise<PersonalizedOpportunityRecommendationsOutput> {
  return personalizedOpportunityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedOpportunityRecommendationsPrompt',
  input: {schema: PersonalizedOpportunityRecommendationsInputSchema},
  output: {schema: PersonalizedOpportunityRecommendationsOutputSchema},
  prompt: `You are an expert career advisor specializing in recommending opportunities to users based on their profile.

You will use the user profile and the list of opportunities to recommend the most relevant opportunities to the user.

User Profile: {{{userProfile}}}
Opportunities: {{{opportunities}}}

Recommendations:`,
});

const personalizedOpportunityRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedOpportunityRecommendationsFlow',
    inputSchema: PersonalizedOpportunityRecommendationsInputSchema,
    outputSchema: PersonalizedOpportunityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
