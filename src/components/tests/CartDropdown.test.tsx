import {describe, expect, it, vi} from 'vitest';
import {CartDropdown} from '../CartDropdown';
import {render, screen} from '../../__tests__/test-utils';


vi.mock('../../../hooks/redux', () => ({
  useAppDispatch: () => vi.fn(),
}));

const mockProduct = {
  id: 1,
  name: 'Apple - 1kg',
  price: 2.99,
  image: 'apple.jpg',
  category: 'fruits'
};

const mockCartItem = {
  product: mockProduct,
  quantity: 2
};

describe('CartDropdown', () => {
  it('should show empty cart message', () => {
    render(<CartDropdown cart={[]} total={0} />);

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument();
  });

  it('should display cart items', () => {
    render(<CartDropdown cart={[mockCartItem]} total={5.98} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('1kg')).toBeInTheDocument();
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});