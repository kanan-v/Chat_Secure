import { buildContext } from './contextBuilder';
import { analyzeSecurityContext } from './securityContextBuilder';
import { facts } from '../knowledge/facts';
import { securityKnowledge } from '../knowledge/security';

export const generateAIResponse = (userMessage: string): string => {
  const { realTimeInfo, context } = buildContext(userMessage);
  const securityContext = analyzeSecurityContext(userMessage);

  // Handle security and privacy questions with detailed responses
  if (securityContext.asksAboutEncryption) {
    const { encryption } = securityKnowledge;
    return `We use ${encryption.algorithm} encryption. ${encryption.messageEncryption}. ${encryption.keyStorage}. The process works like this: ${encryption.process.join(" → ")}`;
  }

  if (securityContext.asksAboutPrivacy) {
    const { privacy } = securityKnowledge;
    return `Your privacy is our top priority. ${privacy.dataCollection}. ${privacy.messageStorage.duration}, and ${privacy.messageStorage.deletion}. For user privacy: ${privacy.userPrivacy.metadata}, ${privacy.userPrivacy.tracking}, and ${privacy.userPrivacy.advertising}.`;
  }

  if (securityContext.asksAboutCompliance) {
    const { compliance } = securityKnowledge;
    return `We maintain high security standards including: ${compliance.standards.join(", ")}. We ensure this through: ${compliance.bestPractices.join(", ")}.`;
  }

  if (securityContext.asksAboutDataCollection) {
    const { privacy } = securityKnowledge;
    return `Regarding data collection: ${privacy.dataCollection}. ${privacy.userPrivacy.metadata}. ${privacy.userPrivacy.tracking}. ${privacy.userPrivacy.advertising}.`;
  }

  // Handle greetings
  if (context.containsGreeting) {
    return `Hello! I'm your AI assistant. The current time is ${realTimeInfo.currentTime}. How can I help you today?`;
  }

  // Handle time-related questions
  if (context.asksAboutTime) {
    return `It's currently ${realTimeInfo.currentTime} in ${realTimeInfo.timezone}.`;
  }

  // Handle weather-related questions
  if (context.asksAboutWeather) {
    const { weather } = realTimeInfo;
    return `Currently it's ${weather.temperature} and ${weather.condition.toLowerCase()}.`;
  }

  // Handle general questions by searching through common questions
  const matchingQuestion = facts.help.common_questions.find(
    qa => userMessage.toLowerCase().includes(qa.q.toLowerCase())
  );
  if (matchingQuestion) {
    return matchingQuestion.a;
  }

  // Default response with company context
  return `I'm here to help you with ${facts.general.company.name}. We offer ${facts.general.company.features.join(", ")}. What would you like to know more about?`;
};