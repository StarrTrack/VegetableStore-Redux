import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
  );

  if (!response.ok) {
    throw new Error('Не удалось получить продукты');
  }

  const data = await response.json();
  return data;
};
