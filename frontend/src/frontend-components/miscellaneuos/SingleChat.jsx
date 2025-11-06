import { Box, IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { FaArrowLeftLong } from "react-icons/fa6";

import React from "react";
import { getSender, getSenderfull } from "../../config/chatLogic";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModel from "./UpdateGroupChatModel";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  console.log(user.data)
  console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            padding={5}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={() => setSelectedChat("")}
            >
              <FaArrowLeftLong />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user.data , selectedChat.users)}
                <ProfileModal user={getSenderfull(user.data, selectedChat.users)}/>
              </>
            ) : (
              <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModel
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                  />
              </>
              )}
          </Text>
          <Box
            display="flex"
            justifyContent="flex-end"
            flexDir="column"
            p={3}
            background="#14213d"
            width="95%"
            height="86%"
            borderRadius="lg"
            overflow="hidden"
          >
            {/* Message Here     */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text>Click on user to start Chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
