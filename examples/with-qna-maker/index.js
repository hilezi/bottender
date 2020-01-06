const { chain } = require('bottender');
const axios = require('axios');

// FIXME: use @bottender/qna-maker package
const qnaMaker = require('../../packages/bottender-qna-maker');

const { RESOURCE_NAME, KNOWLEDGE_BASE_ID, ENDPOINT_KEY } = process.env;

const QnaMaker = qnaMaker({
  resourceName: RESOURCE_NAME,
  knowledgeBaseId: KNOWLEDGE_BASE_ID,
  endpointKey: ENDPOINT_KEY,
  scoreThreshold: 70,
});

async function Unknown(context) {
  await context.sendText('Sorry, I don’t know what you say.');
}

module.exports = async function App() {
  return chain([
    QnaMaker, //
    Unknown,
  ]);
};
