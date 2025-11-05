import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Catalog } from '../Catalog';
import { render, screen, waitFor } from '../../../__tests__/test-utils';
import { fetchProducts } from '../../../api/products';

const mockProducts = [
  {
    id: 1,
    name: 'Apple - 1kg',
    price: 2.99,
    image: 'apple.jpg',
    category: 'fruits'
  }
];

vi.mock('../../../api/products');

describe('Catalog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display products after successful load', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);

    render(<Catalog />);

    await waitFor(() => {
      expect(screen.getByText('Catalog')).toBeInTheDocument();
    });

    expect(screen.getByText('Apple')).toBeInTheDocument();
  });
});