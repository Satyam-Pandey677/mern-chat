import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ChatLoading from "../ChatLoading";
import { getSender } from "../../config/chatLogic";
import GroupChatModel from "./GroupChatMOdel";

const MyChat = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);


  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px "
    >
      <Box
        paddingBottom={3}
        paddingInline={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>My Chats</Box>
      <GroupChatModel>
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        >
          New Group Chat
          <FaPlus />
        </Button>
      </GroupChatModel>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        padding={3}
        width="100%"
        height="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                background={selectedChat === chat ? "#14213d" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser.data, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
