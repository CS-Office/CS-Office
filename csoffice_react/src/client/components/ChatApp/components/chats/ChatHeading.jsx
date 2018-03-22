import React from 'react';

function ChatHeading({ name, numberOfUsers }) {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="status">
          <div className="indicator" />
          <span>{numberOfUsers || null}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeading;
