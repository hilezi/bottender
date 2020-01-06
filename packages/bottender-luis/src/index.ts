import axios from 'axios';
import { withProps } from 'bottender';

/**
 * const Luis = luis({
 *   appId: 'APP_ID',
 *   appKey: 'APP_KEY',
 *   endpoint: 'westus.api.cognitive.microsoft.com',
 *   scoreThreshold: 0.7,
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 *
 */
module.exports = function luis({
  appId,
  appKey,
  endpoint,
  scoreThreshold,
  actions,
  verbose = true,
  timezoneOffset,
  spellCheck,
  staging,
  bingSpellCheckSubscriptionKey,
  log,
}: {
  appId: string;
  appKey: string;
  endpoint: string;
  scoreThreshold: number;
  actions: Record<string, Function>;
  verbose?: boolean;
  timezoneOffset?: number;
  spellCheck?: boolean;
  staging?: boolean;
  bingSpellCheckSubscriptionKey?: string;
  log?: boolean;
}) {
  return async function Luis(context: any, { next }: { next: Function }) {
    if (!context.event.isText) {
      return next;
    }

    const params = {
      'subscription-key': appKey,
      q: context.event.text,
      timezoneOffset,
      verbose,
      spellCheck,
      staging,
      'bing-spell-check-subscription-key': bingSpellCheckSubscriptionKey,
      log,
    };

    // https://docs.microsoft.com/en-us/rest/api/cognitiveservices/luis-runtime/prediction/resolve
    const { data } = await axios.get(`${endpoint}luis/v2.0/apps/${appId}`, {
      params,
    });

    const { topScoringIntent, entities, sentimentAnalysis } = data;

    if (topScoringIntent.score > scoreThreshold) {
      const Action = actions[topScoringIntent.intent];
      if (Action) {
        return withProps(Action, {
          topScoringIntent,
          entities,
          sentimentAnalysis,
        });
      }
    }

    return next;
  };
};
