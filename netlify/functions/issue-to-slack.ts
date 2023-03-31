import { Handler, HandlerEvent } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function (event: HandlerEvent) {
  // Check for empty body
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: "No body",
      }),
    };
  }

  // Check if SLACK_URL process env is set
  if (process.env.SLACK_URL === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: "No SLACK_URL",
      }),
    };
  }

  const json = JSON.parse(event.body);
  const payload = `{"text":"Issue Created: ${json.issue.html_url}"}`;

  const response = await fetch(process.env.SLACK_URL, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.text();

  return {
    statusCode: 200,
    body: responseBody,
  };
};

export { handler };
