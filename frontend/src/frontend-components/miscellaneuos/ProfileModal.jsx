import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";

const ProfileModal = ({ user }) => {
  console.log(user);

  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="ghost" focusRingWidth="none">
            Profile
          </Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>My Profile</Dialog.Title>
              </Dialog.Header>
              <Dialog.Header
                 fontSize="25px"
                  fontFamily="Work sans"
                  display="flex"
                  justifyContent="center"
              >
                <Dialog.Title>
                  {user.username}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  src={user.pic}
                  boxSize="150px"
                  borderRadius="full"
                  fit="cover"
                  alt="Naruto Uzumaki"
                />

                <Text fontSize="3xl" mt="15px">{user.email}</Text>
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

export default ProfileModal;
