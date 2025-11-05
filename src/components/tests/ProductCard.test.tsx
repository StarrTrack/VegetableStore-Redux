import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductCard } from '../ProductCard';
import { render, screen, fireEvent } from '../../__tests__/test-utils';
import * as cartSlice from '../../store/slices/cartSlice';

const mockProduct = {
  id: 1,
  name: 'Apple - 1kg',
  price: 2.99,
  image: 'apple.jpg',
  category: 'fruits',
};

vi.mock('../../store/slices/cartSlice', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    addToCart: vi.fn().mockImplementation((payload) => ({
      type: 'cart/addToCart',
      payload,
    })),
  };
});

const mockDispatch = vi.fn();
vi.mock('../../hooks/redux', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn((selector) =>
    selector({
      cart: { items: [] },
    })
  ),
}));

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('1kg')).toBeInTheDocument();
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getByAltText('Apple - 1kg')).toBeInTheDocument();
  });

  it('should dispatch addToCart when button is clicked', () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    const expectedPayload = {
      product: mockProduct,
      quantity: 1,
    };

    expect(cartSlice.addToCart).toHaveBeenCalledWith(expectedPayload);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: expectedPayload,
    });
  });
});
