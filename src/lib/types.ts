export type Artisan = {
  id: string;
  name: string;
  tradition: string;
  location: string;
  impact: string;
  story: string;
  avatarUrl: string;
  avatarHint: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  material: string;
  origin: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  artisanId: string;
};
