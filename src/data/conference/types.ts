export type SpeakerId =
  | "aimen-taimur"
  | "anass-sedrati"
  | "anders-hedman"
  | "reda-lemeden"
  | "sam-verschooren"
  | "su-ling-yeh";

export type DayId = "2027-01-28" | "2027-01-29";
export type AbstractId = "eu-regulation" | "conferred-agency";
export type SessionKind =
  | "logistics"
  | "welcome"
  | "keynote"
  | "talk"
  | "break"
  | "panel"
  | "breakout"
  | "social"
  | "closing";

export interface Speaker {
  id: SpeakerId;
  name: string;
  role: string;
  institution?: string;
  shortBio: string;
  fullBio: string[];
  profileUrl?: string;
  /** Overrides the default profile link label. */
  profileLabel?: string;
  sessionIds: string[];
  portrait?: {src: string; alt: string; width: number; height: number};
}

export interface Session {
  id: string;
  day: DayId;
  start: string;
  end: string;
  kind: SessionKind;
  title?: string;
  speakerIds: SpeakerId[];
  tbd: boolean;
  abstractId?: AbstractId;
}

export interface ProgrammeDay {
  id: DayId;
  label: string;
  dateLabel: string;
  sessions: Session[];
}

export interface TalkAbstract {
  id: AbstractId;
  title: string;
  speakerId: SpeakerId;
  paragraphs: string[];
}

export interface ConferenceContent {
  title: string;
  description: string;
  dateLabel: string;
  startDate: DayId;
  endDate: DayId;
  placeLabel: string;
  hero: {
    lede: string;
    programmeAction: string;
    contactAction: string;
  };
  navigation: {href: string; label: string}[];
  facts: {label: string; value: string}[];
  about: {heading: string; paragraphs: string[]; subjects: string[]};
  speakers: Speaker[];
  /** People who run the conference. Same shape and anchors as speakers. */
  organisers: Speaker[];
  programme: ProgrammeDay[];
  abstracts: TalkAbstract[];
  venue: {
    institution: string;
    room: string;
    street: string;
    floor: string;
    city: string;
    country: string;
    mapUrl: string;
    dinner: {
      day: DayId;
      start: string;
      end: string;
      description: string;
      note: string;
    };
  };
  /** Named contacts, in order. Every contact link mails all of them. */
  contacts: {
    name: string;
    email: string;
    profile?: {url: string; label: string};
  }[];
}
