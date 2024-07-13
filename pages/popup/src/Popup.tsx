import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

import { ComponentPropsWithoutRef } from 'react';
const settingMessage = chrome.i18n.getMessage('setting');

const Popup = () => {
  return (
    <div className="px-5 py-3 App gap-2 h-full">
      <img className="h-16 w-16" src={chrome.runtime.getURL('popup/icon-256.png')} alt="logo" />
      <h1 className="text-lg font-bold">Quick Copy Link</h1>
      <OpenOptionButton>{settingMessage}</OpenOptionButton>
    </div>
  );
};

const OpenOptionButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold  py-2 px-4 rounded shadow hover:scale-105 transition-transform ease-in-out duration-300 text-base'
      }
      onClick={() => {
        chrome.runtime.openOptionsPage();
      }}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
