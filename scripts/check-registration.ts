// Read-only check that the custom registration form can still post to the
// organisers' Ungapped survey. Run with `pnpm check:registration` (Node runs
// TypeScript directly). The scheduled `Registration` workflow runs it daily.
//
// It never submits: it sends one GET for the survey definition and one CORS
// preflight (OPTIONS), which Ungapped answers without creating a response.

import {SITE_URL} from "../src/consts.ts";
import {
  compareDefinition,
  surveyUrl,
  type SurveyDefinition
} from "../src/scripts/registration/schema.ts";

const problems: string[] = [];

const definitionResponse = await fetch(`${surveyUrl}?culture=en-US`, {
  headers: {Accept: "application/json", Origin: SITE_URL}
});
if (!definitionResponse.ok) {
  problems.push(`GET definition returned ${definitionResponse.status}`);
} else {
  const allowOrigin = definitionResponse.headers.get(
    "access-control-allow-origin"
  );
  if (allowOrigin !== "*" && allowOrigin !== SITE_URL)
    problems.push(`GET allows origin ${allowOrigin}, not ${SITE_URL}`);
  const definition = (await definitionResponse.json()) as SurveyDefinition;
  problems.push(...compareDefinition(definition, {includeDates: true}));
  if (definition.EventRegistrationIsOpen === false)
    console.log("Note: registration is closed in Ungapped.");
  if (definition.EventIsFull)
    console.log("Note: the event is full; new registrations are waitlisted.");
}

const preflight = await fetch(surveyUrl, {
  method: "OPTIONS",
  headers: {
    Origin: SITE_URL,
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "content-type"
  }
});
const allowOrigin = preflight.headers.get("access-control-allow-origin");
const allowMethods =
  preflight.headers.get("access-control-allow-methods") ?? "";
const allowHeaders = (
  preflight.headers.get("access-control-allow-headers") ?? ""
).toLowerCase();
if (!preflight.ok) problems.push(`CORS preflight returned ${preflight.status}`);
if (allowOrigin !== "*" && allowOrigin !== SITE_URL)
  problems.push(`CORS preflight allows origin ${allowOrigin}`);
if (!/\bPOST\b/i.test(allowMethods))
  problems.push(`CORS preflight allows methods "${allowMethods}"`);
if (!allowHeaders.includes("content-type") && allowHeaders !== "*")
  problems.push(`CORS preflight allows headers "${allowHeaders}"`);

if (problems.length) {
  console.error(
    "The registration form no longer matches the Ungapped survey.\n" +
      "Until this is fixed, the site shows the link to the official form.\n" +
      "Update src/data/conference/registration.json (and the form) to match:\n"
  );
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log("Registration survey matches registration.json; CORS allows POST.");
