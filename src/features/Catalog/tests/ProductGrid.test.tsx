import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from '../ProductGrid';
import { render, screen } from '../../../__tests__/test-utils';

const mockProducts = [
  { id: 1, name: 'Apple - 1kg', price: 2.99, image: 'apple.jpg' },
  { id: 2, name: 'Banana - 1kg', price: 1.99, image: 'banana.jpg' },
];

const mockAddToCart = vi.fn();
const mockUpdateQuantity = vi.fn();

describe('ProductGrid', () => {
  it('should display Catalog title', () => {
    render(
      <ProductGrid
        products={mockProducts}
        addToCart={mockAddToCart}
        updateQuantity={mockUpdateQuantity}
      />
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render all provided products', () => {
    render(
      <ProductGrid
        products={mockProducts}
        addToCart={mockAddToCart}
        updateQuantity={mockUpdateQuantity}
      />
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
