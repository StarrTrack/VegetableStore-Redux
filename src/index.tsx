import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles/global.css';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);
