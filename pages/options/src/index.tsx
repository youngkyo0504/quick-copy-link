import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Options from '@src/Options';
import { OverlayProvider } from 'overlay-kit';
import { Toaster } from './components/ui/toaster';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);

  root.render(
    <OverlayProvider>
      <Options />
      <Toaster />
    </OverlayProvider>,
  );
}

init();
