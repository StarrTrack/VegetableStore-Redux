import React from 'react';
import { Catalog } from './features/Catalog/Catalog';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Catalog />
    </Provider>
  );
};

export default App;
