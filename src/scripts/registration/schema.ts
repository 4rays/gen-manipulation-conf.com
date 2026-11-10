// Registration goes to an Ungapped survey that the KTH organisers manage.
// Ungapped has no documented API. This module copies the request that its
// own form widget (`/Widgets/forms.js`) sends, and checks that the live
// survey still has the questions this site expects. No DOM access, so the
// scheduled schema check (scripts/check-registration.ts) can use it in Node.
//
// Plain TypeScript only (no enums or parameter properties): Node runs the
// check script with type stripping.

import expected from "../../data/conference/registration.json" with {type: "json"};

export type RegistrationSchema = typeof expected;
/** A `key` from registration.json, such as "email" or "attendance". */
export type QuestionKey = string;

/** Ungapped question types (`ungapped.application.options.Survey`). */
export const QuestionType = {
  Single: 10,
  Multiple: 20,
  FreeText: 30,
  InputField: 40
} as const;

interface DefinitionAnswer {
  FreeText: string | null;
  Numeric: number | null;
  DynamicValues: unknown[];
  Options: string[];
}

interface DefinitionQuestion {
  QuestionId: string;
  Type: number;
  Format: number;
  Required: boolean;
  DefaultValue?: string | null;
  QuestionOptions?: {QuestionOptionId: string}[] | null;
  QuestionConditions?:
    | {Operator: number; QuestionOption?: {QuestionOptionId: string} | null}[]
    | null;
  Answer: DefinitionAnswer;
}

/** The parts of `GET /api/Surveys/{id}` this site reads. */
export interface SurveyDefinition {
  SurveyId: string;
  EventId?: string | null;
  EventIsFull?: boolean;
  EventRegistrationIsOpen?: boolean;
  EventRegistrationCloses?: string | null;
  Questions: DefinitionQuestion[];
  [key: string]: unknown;
}

export const schema: RegistrationSchema = expected;
export const surveyUrl = `${schema.origin}/api/Surveys/${schema.surveyId}`;
/** The organisers' own Ungapped page for the same survey. */
export const officialFormUrl = `${schema.origin}/Surveys/${schema.surveyId}`;

/**
 * Lists every way the live survey differs from `registration.json`. An empty
 * list means this site can submit to it. A change in the closing date does
 * not stop submissions, so only the scheduled check reports it.
 */
export function compareDefinition(
  definition: SurveyDefinition,
  {includeDates = false} = {}
): string[] {
  const problems: string[] = [];
  if (definition.SurveyId !== schema.surveyId)
    problems.push(`Survey ID is ${definition.SurveyId}`);
  if (definition.EventId !== schema.eventId)
    problems.push(`Event ID is ${definition.EventId}`);
  if (includeDates && definition.EventRegistrationCloses !== schema.closes)
    problems.push(
      `Registration closes at ${definition.EventRegistrationCloses}, not ${schema.closes}`
    );

  const live = definition.Questions ?? [];
  const liveIds = live.map((q) => q.QuestionId).join(",");
  const expectedIds = schema.questions.map((q) => q.id).join(",");
  if (liveIds !== expectedIds)
    problems.push(
      `Questions differ. Live: ${live.length} [${liveIds}]. Expected: ${schema.questions.length}.`
    );

  for (const want of schema.questions) {
    const q = live.find((item) => item.QuestionId === want.id);
    if (!q) continue;
    const label = `Question "${want.key}"`;
    if (q.Type !== want.type) problems.push(`${label} has type ${q.Type}`);
    if (q.Format !== want.format)
      problems.push(`${label} has format ${q.Format}`);
    if (q.Required !== want.required)
      problems.push(`${label} required is ${q.Required}`);
    if ((q.DefaultValue || null) !== (want.defaultValue || null))
      problems.push(`${label} default value is ${q.DefaultValue}`);

    const options = (q.QuestionOptions ?? []).map((o) => o.QuestionOptionId);
    const wantOptions = want.options?.map((o) => o.id) ?? [];
    if (options.join(",") !== wantOptions.join(","))
      problems.push(`${label} options are [${options.join(",")}]`);

    const conditions = q.QuestionConditions ?? [];
    const showIf = want.showIf;
    if (showIf) {
      const option = schema.questions
        .find((p) => p.key === showIf.question)
        ?.options?.find((o) => o.key === showIf.option);
      const ok =
        conditions.length === 1 &&
        conditions[0].Operator === 1 &&
        conditions[0].QuestionOption?.QuestionOptionId === option?.id;
      if (!ok) problems.push(`${label} condition changed`);
    } else if (conditions.length) {
      problems.push(`${label} has ${conditions.length} new condition(s)`);
    }
  }
  return problems;
}

/**
 * Answers by question key: text for text questions (null while the question
 * is hidden), option IDs for choices.
 */
export type Answers = Partial<Record<QuestionKey, string | string[] | null>>;

/**
 * Builds the body of `POST /api/Surveys/{id}` exactly as the Ungapped widget
 * does: every key of the definition that matches /SurveyId|Event/, plus every
 * question. Single-choice questions send only their options; the others send
 * the whole answer object.
 */
export function buildPayload(definition: SurveyDefinition, answers: Answers) {
  const byId = new Map(schema.questions.map((q) => [q.id, q.key]));
  const survey: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(definition)) {
    if (/SurveyId|Event/.test(key)) survey[key] = value;
    if (key === "Questions")
      survey.Questions = definition.Questions.map((q) => {
        const key = byId.get(q.QuestionId);
        const value = key ? answers[key] : undefined;
        const options = Array.isArray(value) ? value : [];
        if (q.Type === QuestionType.Single)
          return {QuestionId: q.QuestionId, Answer: {Options: options}};
        const isChoice = q.Type === QuestionType.Multiple;
        return {
          QuestionId: q.QuestionId,
          Answer: {
            ...q.Answer,
            // As the widget does when a field is left untouched: an empty
            // one-line field sends "", an empty multi-line or hidden one null.
            FreeText:
              !isChoice &&
              typeof value === "string" &&
              (value !== "" || q.Type === QuestionType.InputField)
                ? value
                : null,
            Options: isChoice ? options : q.Answer.Options
          }
        };
      });
  }
  // The widget also names Contact, IssueId, Culture and CorrelationId, but on
  // the public page they are undefined, so JSON.stringify drops them.
  return {Survey: survey};
}

/** Outcome of a submission, from the status codes the widget handles. */
export type SubmitResult =
  "success" | "already" | "full" | "tooLong" | "error" | "timeout";

export function classifyResponse(status: number, body: string): SubmitResult {
  if (status >= 200 && status < 300) return "success";
  if (status === 400 && /Already answered|Contact already exists/.test(body))
    return "already";
  if (status === 400 && /Too many participants|Event is full/.test(body))
    return "full";
  if (status === 422) return "tooLong";
  return "error";
}
