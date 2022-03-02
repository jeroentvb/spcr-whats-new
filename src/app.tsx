import semverGt from 'semver/functions/gt';
import { wrapReactElement } from './utils/wrap-react-element';

import type { SpcrWhatsNewModalContent } from './types/modal-content.model';

/**
 * @param appName local storage key prefix
 * @param currentVersion current app/extension version. MUST be semver
 * @param content content to display in the modal
 */
async function showWhatsNew(appName: string, currentVersion: string, content: SpcrWhatsNewModalContent) {
   while (!Spicetify?.PopupModal || !Spicetify?.LocalStorage) {
      await new Promise(resolve => setTimeout(resolve, 100));
   }

   const LS_KEY = `spcr-whats-new_${appName}-version`;
   const versionFromLocalstorage = Spicetify.LocalStorage.get(LS_KEY) ?? '';

   try {
      // If versionFromLocalstorage isn't a semver version, it will throw an error
      if (semverGt(currentVersion, versionFromLocalstorage)) {
         Spicetify.LocalStorage.set(LS_KEY, currentVersion);
         showModal();
      }
   } catch(err) {
      Spicetify.LocalStorage.set(LS_KEY, currentVersion);
   }

   function showModal() {
      const modalContent: Spicetify.PopupModal.Content = {
         ...content,
         content: wrapReactElement(content.content)
      };

      Spicetify.PopupModal.display(modalContent);
   }
}

export default showWhatsNew;
