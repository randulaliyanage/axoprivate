// Shared types used across the entire app

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
  imageUrl?: string;
  badge: string | null;
  sizes: string[];
  desc: string;
}

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}