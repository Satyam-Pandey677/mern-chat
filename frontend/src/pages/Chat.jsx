import SideDrawer from "../frontend-components/miscellaneuos/SideDrawer.jsx";
import { ChatState } from "../context/chatProvider";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyChat from "../frontend-components/miscellaneuos/MyChat.jsx";
import ChatBox from "../frontend-components/miscellaneuos/ChatBox.jsx";

const Chat = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  console.log(fetchAgain)

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        p="10px"
      >
        {user && (
          <MyChat fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
