import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async function (
  event: HandlerEvent,
  context: HandlerContext
) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: (event.queryStringParameters?.name ?? "").toUpperCase(),
    }),
  };
};

export { handler };
