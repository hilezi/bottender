export type Message = {};

export type DialogflowContext = {};

export type Platform = 'enum';

export type WebhookState = 'enum';

export type Parameter = {};

export type TrainingPhrase = {};

export type FollowupIntentInfo = {};

export type Intent = {
  name: string;
  displayName: string;
  webhookState: WebhookState;
  priority: number;
  isFallback: boolean;
  mlDisabled: boolean;
  inputContextNames: string[];
  events: string[];
  trainingPhrases: TrainingPhrase[];
  action: string;
  outputContexts: DialogflowContext[];
  resetContexts: boolean;
  parameters: Parameter[];
  messages: Message[];
  defaultResponsePlatforms: Platform[];
  rootFollowupIntentName: string;
  parentFollowupIntentName: string;
  followupIntentInfo: FollowupIntentInfo[];
};

export type SentimentAnalysisResult = {};

export type QueryResult = {
  queryText: string;
  languageCode: string;
  speechRecognitionConfidence: number;
  action: string;
  parameters: {};
  allRequiredParamsPresent: boolean;
  fulfillmentText: string;
  fulfillmentMessages: Message[];
  webhookSource: string;
  webhookPayload: {};
  outputContexts: DialogflowContext[];
  intent: Intent;
  intentDetectionConfidence: number;
  diagnosticInfo: {};
  sentimentAnalysisResult: SentimentAnalysisResult;
};
