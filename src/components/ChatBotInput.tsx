import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatBotInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatBotInput: React.FC<ChatBotInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      
      <button
        type="submit"
        className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50"
        disabled={!message.trim() || disabled}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};