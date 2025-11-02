import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/chatProvider.jsx";
import Login from "../frontend-components/authentication/Login.jsx";
import SignUp from "../frontend-components/authentication/SignUp.jsx";
import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {


   const {user} = ChatState();
   const navigate = useNavigate()
    if(user){
      navigate("/chats")
    }
  

  return (
    <Container maxWidth="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p="3"
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text color="black " fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box width="100%" p={4} borderRadius="1g" borderWidth="1px">
        <Tabs.Root defaultValue="members" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1" mb="1em" width="100%">
            <Tabs.Trigger value="login" width="50%" textAlign="center" fontSize="2xl">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="signup" width="50%" textAlign="center" fontSize="2xl">
              Signup
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="login">
            <Login/>
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUp/>
          </Tabs.Content>
          <Tabs.Content value="tasks">
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Home;
