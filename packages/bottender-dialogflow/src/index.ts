import dialogflowSdk from 'dialogflow';

import { QueryResult } from './types';

/**
 * const Dialogflow = dialogflow({
 *   projectId: 'PROJECT_ID',
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 */
module.exports = function dialogflow({
  projectId,
  actions,
}: {
  projectId: string;
  actions: Record<string, Function>;
}) {
  const sessionClient = new dialogflowSdk.SessionsClient();

  return async function Dialogflow(context: any, { next }: { next: Function }) {
    if (!context.event.isText) {
      return next;
    }

    const sessionPath = sessionClient.sessionPath(
      projectId,
      context.session.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode: 'en',
        },
      },
      queryParams: {
        timeZone: '',
      },
    };

    // API Reference: https://cloud.google.com/dialogflow/docs/reference/rest/v2/projects.agent.sessions/detectIntent
    const responses = await sessionClient.detectIntent(request);

    const { intent } = responses[0].queryResult as QueryResult;

    // or by id?
    const Action = actions[intent.displayName];
    if (Action) {
      return Action;
    }

    return next;
  };
};
