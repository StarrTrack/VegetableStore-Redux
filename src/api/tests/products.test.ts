import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProducts } from '../products';

const mockProducts = [
  {
    id: 1,
    name: 'Apple - 1kg',
    price: 2.99,
    image: 'apple.jpg',
    category: 'fruits',
  },
];

global.fetch = vi.fn();

describe('fetchProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return products array on successful request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const result = await fetchProducts();
    expect(result).toEqual(mockProducts);
  });

  it('should throw error on failed response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchProducts()).rejects.toThrow(
      'Не удалось получить продукты'
    );
  });
});
