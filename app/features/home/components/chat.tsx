import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const Chat = () => {
  return (
    <div className="relative cursor-pointer hover:text-blue-600">
      <FiMessageSquare className="text-2xl" />
      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
        {/* Display the number of unread messages */}
      </div>
    </div>
  );
};

export default Chat;
