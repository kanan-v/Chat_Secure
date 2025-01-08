import React, { useState } from 'react';
import { Bot, ArrowLeft } from 'lucide-react';
import { ChatBotMessage } from './ChatBotMessage';
import { ChatBotInput } from './ChatBotInput';
import { WelcomeMessage } from './WelcomeMessage';
import { generateBotResponse } from '../lib/botResponses';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotPageProps {
  onBack: () => void;
}

export function ChatBotPage({ onBack }: ChatBotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. I can help you understand ChatSecure's security features and privacy measures. Feel free to ask any questions!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold ml-2">AI Assistant</h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Chat
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 1 && (
              <WelcomeMessage onSuggestionClick={handleSendMessage} />
            )}
            {messages.map((message) => (
              <ChatBotMessage
                key={message.id}
                content={message.content}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && (
              <div className="text-sm text-gray-500 italic ml-4">AI is typing...</div>
            )}
          </div>
          <ChatBotInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </main>
    </div>
  );
};