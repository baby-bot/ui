import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';

/**
 * Check if user localeId is set.
 * If set, return value.
 * Otherwise, check device preference for language code.
 * If successful, save language code in preferences(don't wait for this result) and return code.
 * Otherwise return default value of en-US.
 */
export const initPreferences = async () => {
  try {
    const localeIdRecord = await Preferences.get({ key: 'LOCALE_ID' });
    if (localeIdRecord.value) {
      return localeIdRecord.value;
    }

    const deviceLocaleId = await Device.getLanguageTag();
    if (deviceLocaleId.value) {
      Preferences.set({ key: 'LOCALE_ID', value: deviceLocaleId.value }); // for performance, do not await for this result
      return deviceLocaleId.value;
    }

    return 'en-US';
  } catch (err) {
    console.error(err);
    return 'en-US5';
  }
};
