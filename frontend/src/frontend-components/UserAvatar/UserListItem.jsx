import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user, handleFunction}) => {
  return (
    <Box
        onClick={handleFunction}
        cursor="pointer"
        _hover={{
            background:"#4a4e69"
        }}  
        width="100%"
        display="flex"
        alignItems="center"
        px={3}
        py={2}
        my={2}
        borderRadius="lg" 
    >
        <Stack>
        <HStack key={user.email} gap="4">
          <Avatar.Root size="lg">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.avatar} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium" fontSize="lg">{user.username}</Text>
            <Text color="fg.muted" textStyle="md">
              {user.email}
            </Text>
          </Stack>
        </HStack>
    </Stack> 
    </Box>
  )
}

export default UserListItem