// Progressive enhancement for the registration section. Without JavaScript,
// or when the live survey is not what this site expects, visitors keep the
// link to the organisers' own Ungapped form. Otherwise the custom form
// replaces that link and posts to the same survey.
//
// Markup contract (Registration.astro): every answer sits in one
// `[data-field="<name>"][data-label]` wrapper. Text inputs are named after
// the field; radios and checkboxes carry the Ungapped option ID as value.

import {
  buildPayload,
  classifyResponse,
  compareDefinition,
  schema,
  surveyUrl,
  type Answers,
  type SubmitResult,
  type SurveyDefinition
} from "./schema";

const LOAD_TIMEOUT = 10_000;
const SUBMIT_TIMEOUT = 20_000;

type Messages = Record<Exclude<SubmitResult, "success">, string> & {
  copied: string;
  copyFailed: string;
  emailSubject: string;
};

type Control = HTMLInputElement | HTMLTextAreaElement;

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeout: number
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, {...init, signal: controller.signal});
  } finally {
    clearTimeout(timer);
  }
}

async function loadDefinition(): Promise<SurveyDefinition | null> {
  try {
    const response = await fetchWithTimeout(
      `${surveyUrl}?culture=en-US`,
      {headers: {Accept: "application/json"}, cache: "no-store"},
      LOAD_TIMEOUT
    );
    if (!response.ok) return null;
    return (await response.json()) as SurveyDefinition;
  } catch {
    return null;
  }
}

function setup(section: HTMLElement) {
  const $ = <T extends Element>(selector: string) =>
    section.querySelector<T>(selector);
  const form = $<HTMLFormElement>("[data-registration-form]");
  const link = $<HTMLElement>("[data-registration-link]");
  const status = $<HTMLElement>("[data-registration-status]");
  const fallback = $<HTMLElement>("[data-registration-fallback]");
  const done = $<HTMLElement>("[data-registration-done]");
  const submit = $<HTMLButtonElement>("[data-registration-submit]");
  if (!form || !link || !status || !fallback || !done || !submit) return;
  const messages = JSON.parse(section.dataset.messages ?? "{}") as Messages;
  const notice = (name: string) =>
    $<HTMLElement>(`[data-registration-notice="${name}"]`);

  let definition: SurveyDefinition | null = null;
  let sending = false;

  // Fields --------------------------------------------------------------

  const wrappers = () => [
    ...form.querySelectorAll<HTMLElement>("[data-field]")
  ];
  const wrapper = (name: string) =>
    form.querySelector<HTMLElement>(`[data-field="${name}"]`);
  const controlsIn = (element: HTMLElement) => [
    ...element.querySelectorAll<Control>("input, textarea")
  ];
  const isChoice = (control: Control) =>
    control.type === "radio" || control.type === "checkbox";
  const text = (name: string) => {
    const element = wrapper(name);
    return element ? (controlsIn(element)[0]?.value.trim() ?? "") : "";
  };
  const checked = (name: string) => {
    const element = wrapper(name);
    return element
      ? controlsIn(element)
          .filter((c) => (c as HTMLInputElement).checked)
          .map((c) => c.value)
      : [];
  };

  // "Please specify" appears only for the "other" diet option, as on the
  // Ungapped form. Its text is kept, but not sent while it is hidden.
  const conditions = schema.questions.flatMap((q) =>
    q.showIf
      ? [
          {
            key: q.key,
            parent: q.showIf.question,
            option: schema.questions
              .find((p) => p.key === q.showIf?.question)
              ?.options?.find((o) => o.key === q.showIf?.option)?.id
          }
        ]
      : []
  );
  const isShown = (key: string) =>
    conditions
      .filter((c) => c.key === key)
      .every((c) => !!c.option && checked(c.parent).includes(c.option));
  const updateConditions = () => {
    for (const {key} of conditions) {
      const element = wrapper(key);
      if (element) element.hidden = !isShown(key);
    }
  };

  const answers = (): Answers => {
    const result: Answers = {};
    for (const q of schema.questions) {
      const key = q.key;
      if (!isShown(key)) result[key] = null;
      // Ungapped's full-name field joins first and last name with a space.
      else if (key === "name")
        result.name = [text("firstName"), text("lastName")]
          .filter(Boolean)
          .join(" ");
      else if (q.options) result[key] = checked(key);
      else result[key] = text(key);
    }
    return result;
  };

  // Validation -----------------------------------------------------------

  const validate = (element: HTMLElement) => {
    const controls = controlsIn(element);
    const invalid = controls.find((c) => !c.validity.valid);
    const message = !invalid
      ? ""
      : invalid.validity.valueMissing
        ? (element.dataset.missing ?? "")
        : (element.dataset.invalid ?? element.dataset.missing ?? "");
    for (const control of controls) {
      if (invalid) control.setAttribute("aria-invalid", "true");
      else control.removeAttribute("aria-invalid");
    }
    const error = element.querySelector<HTMLElement>("[data-error]");
    if (error) {
      error.hidden = !invalid;
      const target = error.querySelector("[data-error-text]");
      if (target) target.textContent = message;
    }
    return !invalid;
  };

  const validateAll = () => {
    const invalid = wrappers().filter(
      (element) => !element.closest("[hidden]") && !validate(element)
    );
    invalid[0]?.querySelector<HTMLElement>("input, textarea")?.focus();
    return invalid.length === 0;
  };

  const revalidate = (event: Event) => {
    const element = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-field]"
    );
    const error = element?.querySelector<HTMLElement>("[data-error]");
    if (element && error && !error.hidden) validate(element);
  };
  form.addEventListener("input", revalidate);
  form.addEventListener("change", (event) => {
    updateConditions();
    revalidate(event);
  });

  // Fallback -------------------------------------------------------------

  const summary = () =>
    wrappers()
      .filter((element) => !element.closest("[hidden]"))
      .map((element) => {
        const controls = controlsIn(element);
        const values = controls.some(isChoice)
          ? controls
              .filter((c) => (c as HTMLInputElement).checked)
              .map((c) => c.closest("label")?.textContent?.trim() ?? c.value)
          : controls.map((c) => c.value.trim()).filter(Boolean);
        return `${element.dataset.label}: ${values.join(", ") || "–"}`;
      })
      .join("\n");

  const copyStatus = $<HTMLElement>("[data-registration-copy-status]");
  const copyText = $<HTMLTextAreaElement>("[data-registration-copy-text]");
  $<HTMLButtonElement>("[data-registration-copy]")?.addEventListener(
    "click",
    async () => {
      const value = summary();
      try {
        await navigator.clipboard.writeText(value);
        if (copyStatus) copyStatus.textContent = messages.copied;
        if (copyText) copyText.hidden = true;
      } catch {
        if (copyStatus) copyStatus.textContent = messages.copyFailed;
        if (copyText) {
          copyText.value = value;
          copyText.hidden = false;
          copyText.select();
        }
      }
    }
  );

  const mail = $<HTMLAnchorElement>("[data-registration-mail]");
  const showFallback = () => {
    if (mail) {
      const subject = encodeURIComponent(messages.emailSubject);
      const body = encodeURIComponent(summary());
      mail.href = `mailto:${section.dataset.contacts}?subject=${subject}&body=${body}`;
    }
    if (copyStatus) copyStatus.textContent = "";
    if (copyText) copyText.hidden = true;
    fallback.hidden = false;
  };

  // Submit ---------------------------------------------------------------

  const setSending = (value: boolean) => {
    sending = value;
    submit.disabled = value;
    form.setAttribute("aria-busy", String(value));
    for (const label of submit.querySelectorAll<HTMLElement>("[data-busy]"))
      label.hidden = (label.dataset.busy === "true") !== value;
  };

  const say = (message: string) => {
    status.textContent = message;
    status.hidden = !message;
  };

  const finish = () => {
    form.hidden = true;
    notice("full")?.setAttribute("hidden", "");
    const waitlist = !!definition?.EventIsFull;
    for (const element of done.querySelectorAll<HTMLElement>("[data-done]"))
      element.hidden = (element.dataset.done === "waitlist") !== waitlist;
    done.hidden = false;
    done.focus();
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !definition) return;
    say("");
    fallback.hidden = true;
    if (!validateAll()) return;

    setSending(true);
    let result: SubmitResult;
    try {
      const response = await fetchWithTimeout(
        surveyUrl,
        {
          method: "POST",
          headers: {"Content-Type": "application/json; charset=utf-8"},
          body: JSON.stringify(buildPayload(definition, answers()))
        },
        SUBMIT_TIMEOUT
      );
      result = classifyResponse(
        response.status,
        response.ok ? "" : await response.text().catch(() => "")
      );
    } catch {
      // No response (offline, timeout, blocked). The server may still have
      // saved it, so never resend automatically: Ungapped emails a
      // confirmation, and the message tells the visitor to check for it.
      result = "timeout";
    }
    setSending(false);

    if (result === "success") return finish();
    say(messages[result]);
    if (result === "error") showFallback();
    status.focus();
  });

  // Start ----------------------------------------------------------------

  form.noValidate = true;
  updateConditions();

  loadDefinition().then((live) => {
    if (!live) return;
    if (live.EventRegistrationIsOpen === false) {
      link.hidden = true;
      notice("closed")?.removeAttribute("hidden");
      return;
    }
    const problems = compareDefinition(live);
    if (problems.length) {
      console.warn("Registration form differs from the live survey", problems);
      return;
    }
    definition = live;
    if (live.EventIsFull) notice("full")?.removeAttribute("hidden");
    link.hidden = true;
    form.hidden = false;
  });
}

for (const section of document.querySelectorAll<HTMLElement>(
  "[data-registration]"
))
  setup(section);
