import axios from 'axios';
import { get } from 'lodash';
import { withProps } from 'bottender';

/**
 * const Rasa = rasa({
 *   origin: 'http://localhost:5005',
 *   actions: {
 *     greeting: async function SayHello(context) {
 *       await context.sendText('Hello!');
 *     },
 *   },
 * });
 */
module.exports = function rasa({
  origin = 'http://localhost:5005',
  actions,
}: {
  origin: string;
  actions: Record<string, Function>;
}) {
  return async function Rasa(context: any, { next }: { next: Function }) {
    if (!context.event.isText) {
      return next;
    }

    // API Reference: https://rasa.com/docs/rasa/api/http-api/#operation/parseModelMessage
    const { data } = await axios.post(`${origin}/model/parse`, {
      text: context.event.text,
      message_id: get(context, 'event.message.id'),
    });

    const { intent, entities } = data;

    // You can define your own confidence threshold here.
    if (intent.confidence > 0.7) {
      const Action = actions[intent.name];
      if (Action) {
        return withProps(Action, { intent, entities });
      }
    }

    return next;
  };
};
