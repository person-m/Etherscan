import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  fr: require('../../assets/locales/fr/translations.json'),
  en: require('../../assets/locales/en/translations.json'),
});

i18n.defaultLocale = 'fr';
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;