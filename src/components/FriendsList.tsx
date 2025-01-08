import React from 'react';

interface FriendsListProps {
  onSelectChat: (userId: string) => void;
  selectedChat: string | null;
}

export const FriendsList: React.FC<FriendsListProps> = ({ onSelectChat, selectedChat }) => {
  // Mock data - replace with real data from your database
  const friends = [
    { id: '1', name: 'John Smith', avatar: 'JS', lastMessage: 'Hey, how are you?', time: '2m ago', unread: 2 },
    { id: '2', name: 'Alice Johnson', avatar: 'AJ', lastMessage: 'See you tomorrow!', time: '1h ago', unread: 0 },
    { id: '3', name: 'Mike Wilson', avatar: 'MW', lastMessage: 'Thanks for your help!', time: '2h ago', unread: 1 },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {friends.map((friend) => (
        <button
          key={friend.id}
          onClick={() => onSelectChat(friend.id)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
            selectedChat === friend.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold">{friend.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold truncate">{friend.name}</h3>
              <span className="text-xs text-gray-500">{friend.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 truncate">{friend.lastMessage}</p>
              {friend.unread > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {friend.unread}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};