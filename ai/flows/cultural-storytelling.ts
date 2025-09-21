'use server';

/**
 * @fileOverview Generates a culturally relevant story for a product.
 *
 * - generateCulturalStory - A function that generates a cultural story for a product.
 * - CulturalStorytellingInput - The input type for the generateCulturalStory function.
 * - CulturalStorytellingOutput - The return type for the generateCulturalStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CulturalStorytellingInputSchema = z.object({
  productDetails: z
    .string()
    .describe('Details about the product, including its name, price, material, and origin.'),
  artisanMetadata: z
    .string()
    .describe(
      'Metadata about the artisan, including their name, tradition, location, and impact.'
    ),
});

export type CulturalStorytellingInput = z.infer<
  typeof CulturalStorytellingInputSchema
>;

const CulturalStorytellingOutputSchema = z.object({
  story: z
    .string()
    .describe(
      'A culturally relevant story for the product, based on the product details and artisan metadata.'
    ),
});

export type CulturalStorytellingOutput = z.infer<
  typeof CulturalStorytellingOutputSchema
>;

export async function generateCulturalStory(
  input: CulturalStorytellingInput
): Promise<CulturalStorytellingOutput> {
  return culturalStorytellingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'culturalStorytellingPrompt',
  input: {schema: CulturalStorytellingInputSchema},
  output: {schema: CulturalStorytellingOutputSchema},
  prompt: `You are a storyteller who specializes in creating culturally relevant stories for products.

  Based on the product details and artisan metadata, generate a story that helps customers better understand the product's origins and the artisan's background.

  Product Details: {{{productDetails}}}
  Artisan Metadata: {{{artisanMetadata}}}

  Story:`, // Handlebars template here
});

const culturalStorytellingFlow = ai.defineFlow(
  {
    name: 'culturalStorytellingFlow',
    inputSchema: CulturalStorytellingInputSchema,
    outputSchema: CulturalStorytellingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
