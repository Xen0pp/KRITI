'use server';

import { generateCulturalStory } from '@/ai/flows/cultural-storytelling';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-product-recommendations';
import { applyImageFilter } from '@/ai/flows/image-filter';
import { artisans, products } from '@/lib/data';
import type { Artisan, Product } from '@/lib/types';

export async function generateStoryAction(
  product: Product,
  artisan: Artisan
): Promise<{ story: string } | { error: string }> {
  try {
    const productDetails = `Name: ${product.name}, Price: $${product.price}, Material: ${product.material}, Origin: ${product.origin}`;
    const artisanMetadata = `Name: ${artisan.name}, Tradition: ${artisan.tradition}, Location: ${artisan.location}, Impact: ${artisan.impact}`;

    const result = await generateCulturalStory({ productDetails, artisanMetadata });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate story. Please try again.' };
  }
}

export async function getRecommendationsAction(
  productIds: string[]
): Promise<Product[]> {
    if (productIds.length === 0) {
        // Return some default popular items if history is empty
        return products.slice(0, 5);
    }

  try {
    const result = await getPersonalizedRecommendations({
      userBrowsingHistory: productIds,
      numberOfRecommendations: 5,
    });
    
    const recommendedProducts = result.recommendations
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);

    // Ensure we always return 5 products, fill with others if AI returns less
    if (recommendedProducts.length < 5) {
        const otherProducts = products.filter(p => !result.recommendations.includes(p.id));
        const needed = 5 - recommendedProducts.length;
        recommendedProducts.push(...otherProducts.slice(0, needed));
    }
    
    return recommendedProducts;

  } catch (e) {
    console.error(e);
    // Fallback to popular items on error
    return products.slice(0, 5).reverse();
  }
}

export async function applyFilterAction(
  imageDataUri: string,
  filterStyle: string
): Promise<{ transformedImageUri: string } | { error: string }> {
  try {
    const result = await applyImageFilter({ imageDataUri, filterStyle });
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to apply filter. Please try again later.' };
  }
}
