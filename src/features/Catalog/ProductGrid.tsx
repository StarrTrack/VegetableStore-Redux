import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';
import { SimpleGrid, Text } from '@mantine/core';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <section style={{ width: '100%', marginTop: '49px', padding: '0 20px' }}>
      <Text
        size="xl"
        fw={700}
        mb="md"
        style={{
          paddingLeft: '8px',
        }}
      >
        Catalog
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </section>
  );
};
