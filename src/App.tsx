import React, { useEffect, useState } from 'react';
import { Shield, LogOut, Bot, Search, UserPlus } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { AuthForm } from './components/AuthForm';
import { ChatBotPage } from './components/ChatBotPage';
import { FriendsList } from './components/FriendsList';
import { SearchUsers } from './components/SearchUsers';
import { encryptMessage, decryptMessage } from './lib/encryption';

export default function App() {
  const { user, keys, initialize, signOut } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showChatBot, setShowChatBot] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initialize();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize app');
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const handleSendMessage = (content: string) => {
    if (!keys) return;
    
    const encryptedContent = encryptMessage(content, keys.publicKey);
    const newMessage = {
      content: encryptedContent,
      sender: user.id,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setMessages([...messages, newMessage]);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Initializing ChatSecure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-600 mb-2">Initialization Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please click the "Connect to Supabase" button in the top right corner to set up your project.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (showChatBot) {
    return <ChatBotPage onBack={() => setShowChatBot(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold ml-2">ChatSecure</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowChatBot(true)}
              className="p-2 text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
              <Bot className="w-6 h-6" />
              <span>Chat with AI</span>
            </button>
            <button
              onClick={signOut}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-4 gap-4 p-4">
        {/* Friends List */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Messages</h2>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>
          <FriendsList
            onSelectChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </div>

        {/* Chat Area */}
        <div className="col-span-3 bg-white rounded-lg shadow-sm flex flex-col">
          {selectedChat ? (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={{
                        ...message,
                        content: keys ? decryptMessage(message.content, keys.privateKey) : message.content,
                      }}
                      isOwn={message.sender === user.id}
                    />
                  ))}
                </div>
                {isTyping && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-semibold">JS</span>
                    </div>
                    <div className="bg-gray-100 rounded-full px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ChatInput
                onSendMessage={handleSendMessage}
                onTyping={() => setIsTyping(true)}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </main>

      {showSearch && <SearchUsers onClose={() => setShowSearch(false)} />}
    </div>
  );
}