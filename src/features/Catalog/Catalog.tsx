import React, { useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductGrid';
import { Skeleton, Grid } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadProducts } from '../../store/slices/productsSlice';

export const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector(
    (state) => state.products
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const loadProductsWithMinTime = async () => {
      const startTime = Date.now();
      await dispatch(loadProducts());
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 500;

      if (elapsedTime < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsedTime)
        );
      }
    };

    loadProductsWithMinTime();
  }, [dispatch]);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--app-background)',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Header cartItemCount={cartItemCount} cartTotalPrice={cartTotalPrice} />

        <section
          style={{ width: '100%', marginTop: '49px', padding: '0 20px' }}
        >
          <Skeleton height={30} width={100} mb="md" radius="md" />

          <Grid gutter="lg">
            {[...Array(8)].map((_, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton height={300} radius="xl" />
              </Grid.Col>
            ))}
          </Grid>
        </section>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--app-background)', width: '100%' }}>
      <Header cartItemCount={cartItemCount} cartTotalPrice={cartTotalPrice} />

      <ProductGrid products={products} />
    </div>
  );
};
