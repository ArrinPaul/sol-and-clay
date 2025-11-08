'use server';

/**
 * @fileOverview AI-powered tool to filter collaboration requests.
 *
 * - filterCollaborationRequest - A function that filters collaboration requests based on content analysis.
 * - FilterCollaborationRequestInput - The input type for the filterCollaborationRequest function.
 * - FilterCollaborationRequestOutput - The return type for the filterCollaborationRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterCollaborationRequestInputSchema = z.object({
  studioName: z.string().describe('The name of the studio.'),
  email: z.string().email().describe('The email address of the collaborator.'),
  portfolioURL: z.string().url().describe('The URL of the collaborator portfolio.'),
  pitch: z.string().describe('A short pitch from the collaborator.'),
  imageURL: z.string().url().describe('URL to the sample image uploaded by the collaborator.'),
});
export type FilterCollaborationRequestInput = z.infer<
  typeof FilterCollaborationRequestInputSchema
>;

const FilterCollaborationRequestOutputSchema = z.object({
  isSpam: z
    .boolean()
    .describe(
      'True if the collaboration request is likely spam, otherwise false.'
    ),
  isRelevant: z
    .boolean()
    .describe(
      'True if the collaboration request aligns with the brand aesthetic and quality standards, otherwise false.'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation for the filtering decision, useful for admin review.'
    ),
});
export type FilterCollaborationRequestOutput = z.infer<
  typeof FilterCollaborationRequestOutputSchema
>;

export async function filterCollaborationRequest(
  input: FilterCollaborationRequestInput
): Promise<FilterCollaborationRequestOutput> {
  return filterCollaborationRequestFlow(input);
}

const filterCollaborationRequestPrompt = ai.definePrompt({
  name: 'filterCollaborationRequestPrompt',
  input: {schema: FilterCollaborationRequestInputSchema},
  output: {schema: FilterCollaborationRequestOutputSchema},
  prompt: `You are an AI assistant specializing in filtering collaboration requests for an artisanal home decor brand called "Sol & Clay". Your task is to assess each request and determine if it is likely spam or does not meet the brand's quality standards.

Brand Aesthetic: warm, handcrafted, modern, soulful, earthy tones.

Consider these factors:
- Relevance to artisanal home decor
- Portfolio quality and style
- Presence of spam indicators (e.g., generic pitch, low-quality image, suspicious links)

Input:
Studio Name: {{{studioName}}}
Email: {{{email}}}
Portfolio URL: {{{portfolioURL}}}
Pitch: {{{pitch}}}
Image URL: {{{imageURL}}}

Output:
Based on the input, determine:
- isSpam: Is this request likely spam?
- isRelevant: Does this collaboration align with Sol & Clay's brand aesthetic and quality standards?
- reason: Briefly explain your reasoning for the filtering decision.

Ensure your response is concise and directly addresses the required output fields.`,
});

const filterCollaborationRequestFlow = ai.defineFlow(
  {
    name: 'filterCollaborationRequestFlow',
    inputSchema: FilterCollaborationRequestInputSchema,
    outputSchema: FilterCollaborationRequestOutputSchema,
  },
  async input => {
    const {output} = await filterCollaborationRequestPrompt(input);
    return output!;
  }
);
