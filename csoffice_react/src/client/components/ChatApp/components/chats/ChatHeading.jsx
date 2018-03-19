import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera';
import FAUserPlus from 'react-icons/lib/fa/user-plus';
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control';

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
