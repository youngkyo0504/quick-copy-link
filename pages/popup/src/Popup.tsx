import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

import { ComponentPropsWithoutRef } from 'react';
const settingMessage = chrome.i18n.getMessage('setting');
const description = chrome.i18n.getMessage('shortcutDescription');

const Popup = () => {
  return (
    <div className="px-5 py-3 App gap-2 h-full">
      <img className="h-16 w-16" src={chrome.runtime.getURL('popup/icon-256.png')} alt="logo" />
      <div className="flex-col gap-1 flex">
        <h1 className="text-lg text-center font-bold">Quick Copy Link</h1>
        <KeyboardShortcutHint />
      </div>
      <div className="h-1"></div>
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
        ' py-2 font-bold px-4 rounded shadow hover:scale-105 transition-transform ease-in-out duration-300 text-small'
      }
      onClick={() => {
        chrome.runtime.openOptionsPage();
      }}>
      {props.children}
    </button>
  );
};

const KeyboardShortcutHint = () => {
  return (
    <div className="flex gap-0.5 text-xs justify-start  rounded-lg  max-w-fit flex-col text-center text-gray-500">
      <div className="flex items-center justify-between text-xs">
        <span>{description}</span>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
