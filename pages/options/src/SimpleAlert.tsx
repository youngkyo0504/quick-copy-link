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

const lang = {
  confirm_title: 'Are you absolutely sure?',
  confirm_description: 'This action cannot be undone. This will permanently delete your rule.',
  confirm_cancel: 'Cancel',
  confirm_continue: 'Continue',
};

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
              <AlertDialogTitle>{lang.confirm_title}</AlertDialogTitle>
              <AlertDialogDescription>{lang.confirm_description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancel}>{lang.confirm_cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={agree}>{lang.confirm_continue}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    });
  });
};
