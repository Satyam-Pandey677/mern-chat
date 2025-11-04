import { Badge, Box, CloseButton, Text } from "@chakra-ui/react";
import { TbXboxXFilled } from "react-icons/tb";

import React from "react";

const UserBadge = ({ user, handleFunction }) => {
  console.log(user);
  return (
      <Badge px={4} py={2} display="flex" justifyContent="space-between" fontSize="lg" variant="solid" rounded="full"  colorPalette="blue">
        <Text>
            {user.username}
        </Text>
        <TbXboxXFilled  onClick={handleFunction}/>
      </Badge>
  );
};

export default UserBadge;
