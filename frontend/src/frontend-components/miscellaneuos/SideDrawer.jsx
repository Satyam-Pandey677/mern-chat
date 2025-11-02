import { Tooltip } from "../../components/ui/tooltip";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FaAngleDown, FaArrowDown, FaBell } from "react-icons/fa";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";



const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);


  const {user} = ChatState()
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          content="THis is tooltip content"
          positioning={{ placement: "right-end" }}
        >
          <Button variant="ghost">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="2">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="xl" fontFamily="Work sans">
          Talk-A_Tive
        </Text>

        <div>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton variant="plain" border="none" focusRing="none" marginRight="10px" size="md">
                <FaBell />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt-a">
                    New Text File <Menu.ItemCommand>⌘E</Menu.ItemCommand>
                  </Menu.Item>
                  <Menu.Item value="new-file-a">
                    New File... <Menu.ItemCommand>⌘N</Menu.ItemCommand>
                  </Menu.Item>
                  <Menu.Item value="new-win-a">
                    New Window <Menu.ItemCommand>⌘W</Menu.ItemCommand>
                  </Menu.Item>
                  <Menu.Item value="open-file-a">
                    Open File... <Menu.ItemCommand>⌘O</Menu.ItemCommand>
                  </Menu.Item>
                  <Menu.Item value="export-a">
                    Export <Menu.ItemCommand>⌘S</Menu.ItemCommand>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Menu.Root positioning={{ placement: "bottom" }} >
            <Menu.Trigger focusRing="outside" asChild background="black">
              <IconButton>
                <Avatar.Root size="sm" cursor="pointer">
                  <Avatar.Fallback name={user.data.username} />
                  <Avatar.Image src={user.data.pic} />
                </Avatar.Root>
                <FaAngleDown color="white"/>
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup value="account"> 
                    <ProfileModal user = {user.data}>
                        <Menu.Item></Menu.Item>
                    </ProfileModal>
                  </Menu.ItemGroup>
                  <Menu.Item value="logout" onClick={logoutHandler}>Logout</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </div>
      </Box>

      
    </>
  );
};

export default SideDrawer;
