import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import UserBadge from "../UserAvatar/UserBadge";
import axios from "axios";
import { data } from "react-router-dom";
import UserListItem from "../UserAvatar/UserListItem";
import ChatLoading from "../ChatLoading";

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState()


  const handleRemove = async (chatId, userId) => {
    console.log(chatId, userId);

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/remove-user",
        { chatId, userId },
        config
      );
      console.log(data);
      setFetchAgain(!fetchAgain)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameGroup = async (selectedChat) => {

    try {
      setRenameLoading(true)
      if (selectedChat.groupAdmin._id === user.data._Id) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        const {data} = await axios.put("/api/chat/rename", {
          chatId:selectedChat._id,
          chatName: groupChatName
         }, config)
         
         setRenameLoading(false)
         setFetchAgain(!fetchAgain)
        console.log(data)
    }else{
      console.log("You not a Group Admin")
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    console.log(query)
    setSearch(query)

    if(!query) {
      console.log("please enter sum thing")
      return
    }
    if (selectedChat.groupAdmin._id === user.data._Id){
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data)
    }
    try {
      
    } catch (error) {
      
    }
  }

  const HandleAddusers = async (userToAdd) => {
    console.log(userToAdd)
    try {
      if (selectedChat.groupAdmin._id === user.data._Id) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        const {data} = await axios.put("/api/chat/groupadd", {
          chatId:selectedChat._id,
          userId: userToAdd
         }, config)
  
        console.log(data)
        setFetchAgain(!fetchAgain)
    }else{
      console.log("You not a Group Admin")
    }
    } catch (error) {
      console.log(error);
    }
  }
 

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{selectedChat.chatName}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box display="flex" gap="3" flexWrap="wrap" mb={4}>
                {selectedChat.users.map((u) => (
                  <UserBadge
                    key={u._id}
                    user={u}
                    handleFunction={() => handleRemove(selectedChat._id, u._id)}
                  />
                ))}
              </Box>

              <Fieldset.Root size="lg" maxW="md">

                <Fieldset.Content>
                  <Field.Root >
                    <Box display="flex" gap={3} width="100%">
                    <Input
                      placeholder="Enter New Group Name"
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button type="submit"  onClick={() => handleRenameGroup(selectedChat)}>Update</Button>
                    </Box>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Add User</Field.Label>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </Field.Root>
                </Fieldset.Content>
                <Box>
                        {loading ? (
                          <ChatLoading />
                        ) : (
                          searchResult?.map(user => {                            
                            return(
                            <UserListItem
                                key = {user._id}
                                user= {user}
                                handleFunction = {() => HandleAddusers(user._id)}
                            />
                          )})
                        )}
                      </Box>
                <Box display="flex" gap={5}>  
                <Button
                  background="red"
                  color="white"
                  fontSize="lg"
                  type="submit"
                  alignSelf="flex-start"
                  onClick={() => handleRemove(selectedChat._id, user.data._Id)}
                >
                  Leave
                </Button>
                </Box>


              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UpdateGroupChatModel;
