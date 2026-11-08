import type {Locale} from "@/i18n/constants";
import {conferenceEn} from "./en";
import type {ConferenceContent} from "./types";

export type * from "./types";

// Add a Swedish dataset here only when its public copy is translated.
// Routes and language controls use the same published-locale registry.
const conferenceByLocale: Record<Locale, ConferenceContent> = {
  en: conferenceEn
};

/** One mailto link that reaches every named contact. */
export function contactMailto(contacts: ConferenceContent["contacts"]) {
  return `mailto:${contacts.map(({email}) => email).join(",")}`;
}

export function getConference(locale: Locale): ConferenceContent {
  return conferenceByLocale[locale];
}
