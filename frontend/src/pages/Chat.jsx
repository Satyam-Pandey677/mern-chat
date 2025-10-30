import { Box, Text } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chat = () => {

    const [chats, setChat] = useState([])

    const fetch = async() => {
        const {data} = await axios.get("/api/chat");
        setChat(data)
    };

    useEffect(() => {
        fetch();
    },[])
    console.log(chats)
  return (
    <>
    <Text textStyle="6xl">Chats</Text>
    {
        chats?.map((chat) => (
            <Box key={chat._id}>{chat.chatName}</Box>
        ))
    }
    </>
  )
}

export default Chat