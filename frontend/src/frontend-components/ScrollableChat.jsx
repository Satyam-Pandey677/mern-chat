import React from "react";
import { isLastmessage, isSameSender, isSameSenderMargin } from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, IconButton, ScrollArea, VStack } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";
import { Tooltip } from "../components/ui/tooltip";
import { useScrollToBottom } from "react-scroll-to-bottom";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const sticky = useScrollToBottom();

  return (
    <>
      <ScrollArea.Root
        maxHeight="20rem"
        width="full"
        borderWidth="1px"
        rounded="l2"
        size="xs"
      >
        <ScrollArea.Viewport ref={sticky.scrollRef}>
          <ScrollArea.Content ref={sticky.contentRef}>
            <VStack gap="2" p="3" align="stretch">
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
                        m.sender._id === user.data._Id ? "#BEE3F8*":"#B9F5D0"
                      }`,
                      borderRadius:"20px",
                      padding:"5px 15px",
                      maxWidth:"75%",
                      marginLeft:isSameSenderMargin(messages, m, i, user.data._Id),
                    }}> 
                      {m.content}
                    </span>
                  </div>
                ))}
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </>
  );
};

export default ScrollableChat;
