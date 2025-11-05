import {describe, expect, it} from 'vitest';
import {Header} from '../Header';
import {render, screen} from '../../__tests__/test-utils';

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

describe('Header', () => {
  it('should display store name', () => {
    render(
      <Header 
        cartItemCount={0}
        cartTotalPrice={0}
      />
    );
    
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
  });

  it('should display cart button with item count and total', () => {
    render(
      <Header 
        cartItemCount={2}
        cartTotalPrice={5.98}
      />
    );
    
    expect(screen.getByText('Cart 2 - $ 5.98')).toBeInTheDocument();
  });
});