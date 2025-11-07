import {
  Box,
  Field,
  Flex,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  useStatStyles,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { FaArrowLeftLong } from "react-icons/fa6";

import React, { useEffect, useState } from "react";
import { getSender, getSenderfull } from "../../config/chatLogic";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import axios from "axios";
import "../style.css"
import ScrollableChat from "../ScrollableChat";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000" 

let socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const { user, setSelectedChat, selectedChat } = ChatState();

  useEffect(()=> {
    fetchMessage()
  },[selectedChat])
 
  const fetchMessage = async () => {
    if(!selectedChat) return;
    

    try {
      const config= {
        headers: {
          "Authorization": `Bearer ${user.data.token}`
        }
      } 
      setLoading(true)
      const {data} = await axios.get(`/api/message/${selectedChat._id}`, config)
      
      setMessages(data)
      setLoading(false)
    } catch (error) {
        console.log(error)
    }
  }

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
  };

  useEffect(() => {
    socket = io(ENDPOINT)
  },[])


  return (
    <>
      {selectedChat ? (
        <>
          <Flex
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
              <HStack spacing="3">
                <Text>{getSender(user.data, selectedChat.users)}</Text>

                <ProfileModal
                  user={getSenderfull(user.data, selectedChat.users)}
                />
              </HStack>
            ) : (
              <HStack spacing="3">
                <Text>{selectedChat.chatName.toUpperCase()}</Text>

                {/* Update Group Modal */}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages= {fetchMessage}
                />
              </HStack>
            )}
          </Flex>
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
            {loading ? (
              <Spinner
                size="xl "
                width={20}
                height={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="message">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <Field.Root onKeyDown={sendMessage}>
              <Input
                placeholder="Enter the message"
                variant="outline"
                border="1px solid white"
                fontSize={20}
                onChange={typingHandler}
                value={newMessage}
              />
            </Field.Root>
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
