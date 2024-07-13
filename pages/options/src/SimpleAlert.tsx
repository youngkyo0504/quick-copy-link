import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@src/components/ui/alert-dialog';
import { overlay } from 'overlay-kit';
import { i18n_ko } from './i18n/ko';
import { i18n_en } from './i18n/en';

const message = chrome.i18n.getUILanguage() === 'ko' ? i18n_ko : i18n_en;

export const simpleAlert = async () => {
  return await new Promise<boolean>(resolve => {
    overlay.open(({ isOpen, close }) => {
      const agree = () => {
        resolve(true);
        close();
      };

      const cancel = () => {
        resolve(false);
        close();
      };

      return (
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{message.confirm_title}</AlertDialogTitle>
              <AlertDialogDescription>{message.confirm_description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancel}>{message.confirm_cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={agree}>{message.confirm_continue}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    });
  });
};
