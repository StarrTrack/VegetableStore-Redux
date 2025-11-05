import { describe, it, expect } from 'vitest';
import cartReducer, { addToCart, updateQuantity, removeFromCart } from '../cartSlice';

const mockProduct = {
  id: 1,
  name: 'Test Product - 1kg',
  price: 10.99,
  image: 'test.jpg',
  category: 'fruits'
};

describe('cartSlice', () => {
  it('should add product to cart', () => {
    const initialState = { items: [], isOpen: false };
    
    const action = addToCart({ product: mockProduct, quantity: 2 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].product).toEqual(mockProduct);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should update quantity of existing product', () => {
    const initialState = { 
      items: [{ product: mockProduct, quantity: 1 }], 
      isOpen: false 
    };

    const action = addToCart({ product: mockProduct, quantity: 2 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it('should remove product when quantity is set to 0', () => {
    const initialState = { 
      items: [{ product: mockProduct, quantity: 1 }], 
      isOpen: false 
    };

    const action = updateQuantity({ productId: 1, quantity: 0 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
  });

  it('should remove product using removeFromCart action', () => {
    const initialState = { 
      items: [{ product: mockProduct, quantity: 1 }], 
      isOpen: false 
    };

    const action = removeFromCart(1);
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
  });
});