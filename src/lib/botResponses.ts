import { generateAIResponse } from './ai/responseGenerator';

export const generateBotResponse = (userMessage: string): string => {
  return generateAIResponse(userMessage);
};