import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

/**
 * This function will not throw.
 *
 */
export const getCurrentUser = async () => {
  try {
    return await FirebaseAuthentication.getCurrentUser();
  } catch (err) {
    console.log(err);
    return null;
  }
};
