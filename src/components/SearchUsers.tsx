import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchUsersProps {
  onClose: () => void;
}

export const SearchUsers: React.FC<SearchUsersProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - replace with real search results
  const searchResults = [
    { id: '1', name: 'John Smith', username: '@johnsmith' },
    { id: '2', name: 'Alice Johnson', username: '@alicej' },
    { id: '3', name: 'Mike Wilson', username: '@mikew' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="flex-1 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {searchResults.map((user) => (
            <button
              key={user.id}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};