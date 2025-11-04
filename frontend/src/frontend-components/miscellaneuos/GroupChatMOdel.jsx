import { ChatState } from "../../context/ChatProvider";
import {
    Box,
  Button,
  Center,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadge from "../UserAvatar/UserBadge";

const GroupChatModel = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    console.log(query);
    setSearch(query);
    console.log(search);
    if (!query) {
      console.log("plze provide name or email");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("user already added");
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id !== user._id))
  }

  const handleSubmit = async() => {
    if(!groupChatName || !selectedUsers){
        console.log("please fill all the filled");
        return
    }

    try {
       const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const {data} = await axios.post ("/api/chat /group", {
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map(u => u._id))
      },
      config
    )

    console.log(data)
    setChats([data, ...chats])
    } catch (error) {
        
    }


  };



  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="plain"
            fontSize="lg"
            background="white"
            color="black"
            focusRingWidth="none"
          >
            Create Grop Chat
          </Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content width="xl">
              <Dialog.Header display="flex" justifyContent="center">
                <Dialog.Title>Create Group Chat</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Fieldset.Root size="lg" maxW="md">
                  <Stack>
                    <Fieldset.Legend>Contact details</Fieldset.Legend>
                    <Fieldset.HelperText>
                      Please provide your contact details below.
                    </Fieldset.HelperText>
                  </Stack>

                  <Fieldset.Content>
                    <Field.Root>
                      <Field.Label>Group Name</Field.Label>
                      <Input
                        name="name"
                        placeholder="Enter Group Name"
                        onChange={(e) => setGroupChatName(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Users</Field.Label>
                      <Input
                        name="email"
                        placeholder="Ex : alex, Tony"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                <Box display="flex" gap={5} my={5}  flexWrap="wrap">    
                {selectedUsers?.map((u) => (
                  <UserBadge
                    key={user._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
                </Box>

                {loading ? (
                  <Skeleton flex="1" height="5" variant="pulse" />
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                )}

                {/* render serched User */}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button type="submit" width="100%" onClick={handleSubmit}>
                    Create Group
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};

export default GroupChatModel;
