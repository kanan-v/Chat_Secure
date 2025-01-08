import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WelcomeMessageProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "How does the encryption work?",
    "What security standards do you follow?",
    "How do you protect my privacy?",
    "What data do you collect?",
    "Tell me about message storage",
    "How secure are my messages?"
  ];

  return (
    <div className="text-center mb-8">
      <h2 className="text-xl font-semibold mb-4">Welcome to AI Assistant!</h2>
      <p className="text-gray-600 mb-6">
        I can help you understand ChatSecure's security features and privacy measures.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-sm text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
};