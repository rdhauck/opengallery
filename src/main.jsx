// The starting point. This file loads the styles and puts the app on the page.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.jsx';
import { BlueprintProvider } from './blueprint/BlueprintContext.jsx';

import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/instrument-sans/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';

import './styles/tokens.css';
import './styles/global.css';
import './styles/templates.css';
import './styles/components.css';
import './blueprint/blueprint.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BlueprintProvider>
        <App />
      </BlueprintProvider>
    </BrowserRouter>
  </StrictMode>,
);
