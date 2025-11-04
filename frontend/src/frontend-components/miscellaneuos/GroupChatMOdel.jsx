import { ChatState } from "../../context/ChatProvider";
import {
  Button,
  Center,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const GroupChatModel = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = () => {

  }
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
                      <Input name="name" placeholder="Enter Group Name" value={groupChatName} onChange={(e => setGroupChatName(e.target.value))}/>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Users</Field.Label>
                      <Input name="email"  placeholder="Ex : alex, Tony" onChange={handleSearch}/>
                    </Field.Root>
                  </Fieldset.Content>

                  <Button type="submit" alignSelf="flex-start">
                    Submit
                  </Button>
                </Fieldset.Root>

                {/* Selected Users */}

              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Close</Button>
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
