import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    <HStack gap="7" marginTop="10">
      <Stack flex="1">
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
        <Skeleton height="10" />
      </Stack>
    </HStack>
  )
}

export default ChatLoading