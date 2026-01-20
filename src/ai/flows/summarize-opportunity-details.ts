'use server';
/**
 * @fileOverview Summarizes lengthy opportunity details using generative AI.
 *
 * - summarizeOpportunityDetails - A function that summarizes opportunity details.
 * - SummarizeOpportunityDetailsInput - The input type for the summarizeOpportunityDetails function.
 * - SummarizeOpportunityDetailsOutput - The return type for the summarizeOpportunityDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeOpportunityDetailsInputSchema = z.object({
  opportunityDetails: z
    .string()
    .describe('The lengthy opportunity details to be summarized.'),
});
export type SummarizeOpportunityDetailsInput = z.infer<
  typeof SummarizeOpportunityDetailsInputSchema
>;

const SummarizeOpportunityDetailsOutputSchema = z.object({
  summary: z.string().describe(
    'A concise summary of the opportunity details, including eligibility, benefits, deadlines, and the application link.'
  ),
});
export type SummarizeOpportunityDetailsOutput = z.infer<
  typeof SummarizeOpportunityDetailsOutputSchema
>;

export async function summarizeOpportunityDetails(
  input: SummarizeOpportunityDetailsInput
): Promise<SummarizeOpportunityDetailsOutput> {
  return summarizeOpportunityDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeOpportunityDetailsPrompt',
  input: {schema: SummarizeOpportunityDetailsInputSchema},
  output: {schema: SummarizeOpportunityDetailsOutputSchema},
  prompt: `You are an AI assistant that summarizes job, scholarship, internship, fellowship, and grant opportunities.

  Given the following opportunity details, create a concise summary that includes the key information, such as eligibility criteria, benefits, application deadlines, and the official application link.  Make the summary SEO friendly using keywords such as job, scholarship, internship, fellowship, grant, career development and opportunity.

Opportunity Details: {{{opportunityDetails}}}`,
});

const summarizeOpportunityDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeOpportunityDetailsFlow',
    inputSchema: SummarizeOpportunityDetailsInputSchema,
    outputSchema: SummarizeOpportunityDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
