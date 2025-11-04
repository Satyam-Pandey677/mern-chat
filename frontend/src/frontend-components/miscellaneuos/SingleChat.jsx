import { Box, IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { FaArrowLeftLong } from "react-icons/fa6";

import React from "react";
import { getSender, getSenderfull } from "../../config/chatLogic";
import ProfileModal from "./ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();

  console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
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

          <Text display="flex" color="white">
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : getSender(user.data._Id, selectedChat.users)}
          </Text>

          {
            !selectedChat.isGroupChat? (
                <ProfileModal user={getSenderfull(user.data._Id, selectedChat.users)}>
            <IconButton
              display="flex"
            >
              <FaArrowLeftLong />
            </IconButton>
          </ProfileModal>
            ):(
                getSender(user.data._Id, selectedChat._id)
            )
          }
        </Text>
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
