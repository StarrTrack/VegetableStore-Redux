import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {MantineProvider} from '@mantine/core';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../store/slices/productsSlice';
import cartReducer from '../store/slices/cartSlice';
import {vi} from 'vitest';


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});


function render(
  ui: React.ReactElement,
  {
    preloadedState = {
      products: {
        items: [],
        loading: false,
        error: null,
      },
      cart: {
        items: [],
        isOpen: false,
      },
    }, 
    store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MantineProvider>
          {children}
        </MantineProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };