'use server';

/**
 * @fileOverview An SEO metadata generation AI agent.
 *
 * - generateSeoMetadata - A function that handles the SEO metadata generation process.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  entityType: z.enum(['product', 'collection', 'staticPage']).describe('The type of entity to generate SEO metadata for.'),
  entityName: z.string().describe('The name of the entity.'),
  entityDescription: z.string().describe('The description of the entity.'),
});

export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  title: z.string().describe('The suggested SEO title.'),
  description: z.string().describe('The suggested SEO description.'),
  keywords: z.string().describe('The suggested SEO keywords (comma separated).'),
});

export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(input: GenerateSeoMetadataInput): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `You are an SEO expert specializing in generating metadata for e-commerce websites.

You will generate SEO title, description, and keywords for the given entity.

Entity Type: {{{entityType}}}
Entity Name: {{{entityName}}}
Entity Description: {{{entityDescription}}}

Ensure the title is concise and includes relevant keywords.
The description should be engaging and informative.
The keywords should be comma-separated and relevant to the entity.

Output the title, description, and keywords in the following JSON format:
{
  "title": "Suggested SEO Title",
  "description": "Suggested SEO Description",
  "keywords": "keyword1, keyword2, keyword3"
}
`,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
