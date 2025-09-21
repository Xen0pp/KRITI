'use server';

/**
 * @fileOverview Applies an artistic filter to an image using AI.
 *
 * - applyImageFilter - A function that applies a specified artistic filter to an image.
 * - ImageFilterInput - The input type for the applyImageFilter function.
 * - ImageFilterOutput - The return type for the applyImageFilter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageFilterInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo to be transformed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  filterStyle: z
    .string()
    .describe(
      'The artistic style to apply, e.g., "Madhubani", "Warli", "Pattachitra", "Gond".'
    ),
});
export type ImageFilterInput = z.infer<typeof ImageFilterInputSchema>;

const ImageFilterOutputSchema = z.object({
  transformedImageUri: z
    .string()
    .describe(
      'The transformed image, as a data URI with MIME type and Base64 encoding.'
    ),
});
export type ImageFilterOutput = z.infer<typeof ImageFilterOutputSchema>;

export async function applyImageFilter(
  input: ImageFilterInput
): Promise<ImageFilterOutput> {
  return imageFilterFlow(input);
}

const imageFilterFlow = ai.defineFlow(
  {
    name: 'imageFilterFlow',
    inputSchema: ImageFilterInputSchema,
    outputSchema: ImageFilterOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: `You are an expert digital artist who specializes in traditional Indian art forms.

Transform the following image by applying the style of ${input.filterStyle} art.
The final output must be only the transformed image. Do not include any text or other content.

Image to transform: {{media url=${input.imageDataUri}}}`,
        config: {
            responseModalities: ['IMAGE'],
        }
    });
    
    if (!media.url) {
      throw new Error('Image generation failed to return an image.');
    }
    
    return {
      transformedImageUri: media.url,
    };
  }
);
