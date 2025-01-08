import { facts } from '../knowledge/facts';
import { getRealTimeInfo } from '../knowledge/realTimeData';

export const buildContext = (userMessage: string) => {
  const realTimeInfo = getRealTimeInfo();
  
  // Analyze user message for context
  const context = {
    isQuestion: userMessage.endsWith('?'),
    containsGreeting: /\b(hi|hello|hey)\b/i.test(userMessage),
    asksAboutTime: /\b(time|date|day)\b/i.test(userMessage),
    asksAboutWeather: /\b(weather|temperature)\b/i.test(userMessage),
    asksAboutSecurity: /\b(secure|encryption|privacy)\b/i.test(userMessage)
  };

  return {
    facts,
    realTimeInfo,
    context
  };
};