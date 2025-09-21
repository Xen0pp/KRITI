// src/ai/flows/personalized-product-recommendations.ts
'use server';

/**
 * @fileOverview Personalized product recommendations based on user browsing history.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized product recommendations for a user.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userBrowsingHistory: z.array(
    z.string().describe('IDs of products the user has viewed')
  ).describe('The browsing history of the user, as a list of product ids.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to return.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('IDs of products recommended for the user')
  ).describe('A list of product ids recommended for the user based on their browsing history.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation system.

  Based on the user's browsing history, recommend products that the user might be interested in.
  The user is interested in crafts and artisan products. 

  User browsing history: {{userBrowsingHistory}}

  Return only {{numberOfRecommendations}} product ids in the "recommendations" field.  Do not return any explanation or other text.`, 
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
