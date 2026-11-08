import {defaultLocale, locales} from "@/i18n/constants";
import {getPreferredLanguage, localizeUrl} from "@/i18n/utils";

// An English-only site needs neither a preference cookie nor a redirect.
// When Swedish is published, preserve deep-link state when choosing a locale.
if (locales.length > 1 && window.location.pathname === "/") {
  const preferred = getPreferredLanguage();
  if (preferred !== defaultLocale) {
    window.location.replace(
      localizeUrl("/", preferred) +
        window.location.search +
        window.location.hash
    );
  }
}
