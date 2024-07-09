import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Options from '@src/Options';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);

  root.render(
    <Theme>
      <Options />
    </Theme>,
  );
}

init();
