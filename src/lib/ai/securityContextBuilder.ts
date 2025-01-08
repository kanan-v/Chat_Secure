import { securityKnowledge } from '../knowledge/security';

export const analyzeSecurityContext = (userMessage: string) => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  return {
    asksAboutEncryption: /\b(encrypt|encryption|secure|aes)\b/i.test(lowercaseMessage),
    asksAboutPrivacy: /\b(privacy|private|data|collection|store|storage)\b/i.test(lowercaseMessage),
    asksAboutCompliance: /\b(compliance|standard|audit|security)\b/i.test(lowercaseMessage),
    asksAboutProcess: /\b(how|process|work|explain)\b/i.test(lowercaseMessage),
    asksAboutDataCollection: /\b(collect|track|monitor|data)\b/i.test(lowercaseMessage)
  };
};