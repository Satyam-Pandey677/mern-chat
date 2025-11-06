import React from "react";
import { isLastmessage, isSameSender } from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const sticky = useStickToBottom();

  return (
    <>
    
    </>
  );
};

export default ScrollableChat;
