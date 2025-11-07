import React from "react";
import { isLastmessage, isSameSender, isSameSenderMargin } from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, IconButton, ScrollArea, VStack } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";
import { Tooltip } from "../components/ui/tooltip";
import ScrollToBottom from "react-scroll-to-bottom";
import "./style.css"
// import { useScrollToBottom } from "react-scroll-to-bottom";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <>
        <ScrollToBottom className="scrollable-chat">
              {messages &&
                messages.map((m, i) => (
                  <div style={{ display: "flex" }} key={m._id}>
                    {(isSameSender(messages, m, i, user.data._Id) ||
                      isLastmessage(messages, i, user.data._Id)) && (
                      <Tooltip content={m.sender.username} showArrow   positioning={{ offset: { mainAxis: 4, crossAxis: 4 } }}>
                        <Avatar.Root>
                          <Avatar.Fallback name={m.sender.username} />
                          <Avatar.Image src={m.sender.pic} />
                        </Avatar.Root>
                      </Tooltip>
                    )}

                    <span style={{
                      background: `${
                        m.sender._id === user.data._Id ? "#BEE3F8":"#B9F5D0"
                      }`,
                      color:"black",
                      borderRadius:"20px",
                      padding:"5px 15px",
                      maxWidth:"75%",
                      marginLeft:isSameSenderMargin(messages, m, i, user.data._Id),
                      marginBottom:"10px"
                    }}> 
                      {m.content}
                    </span>
                  </div>
                ))}
        </ScrollToBottom>
    </>
  );
};

export default ScrollableChat;
