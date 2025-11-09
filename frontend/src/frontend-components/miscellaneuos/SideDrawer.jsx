import { Tooltip } from "../../components/ui/tooltip";
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  IconButton,
  Input,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FaAngleDown, FaArrowDown, FaBell } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/chatLogic";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toaster.create({
        description: "Please Enter something in search",
        type: "error",
        duration: 5000,
        closable: true,
      });

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
      setSearchResult(data);
    } catch (error) {
      toaster.create({
        description: "Failed to load the search result",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };


  const accessChat = async(userId) => {
    try {
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const data= await axios.post("/api/chat", {userId}, config)

      if(!chats.find((c) => c._id === data._id))setChats([data,...chats])

      setSelectedChat(data)
      setLoadingChat(false)
    } catch (error) {
      console.log(error)
    }
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
          <Button variant="ghost" asChild>
            <Drawer.Root placement="start">
              <Drawer.Trigger asChild>
                <Button variant="ghost" size="sm">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <Text display={{ base: "none", md: "flex" }} px="2">
                    Search User
                  </Text>
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Drawer Title</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <Box display="flex">
                        <Input
                          type="text"
                          placeholder="Search By NameAnd Email"
                          mr="2"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}>GO</Button>
                      </Box>
                      <Box>
                        {loading ? (
                          <ChatLoading />
                        ) : (
                          searchResult?.map(user => {                            
                            return(
                            <UserListItem
                                key = {user._id}
                                user= {user}
                                handleFunction = {() => accessChat(user._id)}
                            />
                          )})
                        )}
                      </Box>
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </Button>
        </Tooltip>

        <Text fontSize="xl" fontFamily="Work sans">
          Talk-A_Tive
        </Text>

        <div>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                variant="plain"
                border="none"
                focusRing="none"
                marginRight="10px"
                size="md"
              >
                <FaBell />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content p={2} bg={"gray"}>

                  {!notification.length && "No New Messages"}

                  {notification.map(notif =>{ 
                    console.log( user.data._Id)
                    return(
                    <Menu.Item key={notif._id} value="new-txt-a">
                    {notif.chat.isGroupChat? `New Message In ${notif.chat.chatName}`:
                     `New Message from ${getSender(user.data, notif.chat.users)}`
                    }
                  </Menu.Item>
                  )})}
                  {/* <Menu.Item value="new-txt-a">
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
                  </Menu.Item> */}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Menu.Root positioning={{ placement: "bottom" }}>
            <Menu.Trigger focusRing="outside" asChild background="black">
              <IconButton>
                <Avatar.Root size="sm" cursor="pointer">
                  <Avatar.Fallback name={user.data.username} />
                  <Avatar.Image src={user.data.pic} />
                </Avatar.Root>
                <FaAngleDown color="white" />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.ItemGroup value="account">
                    <ProfileModal user={user.data}>
                      <Menu.Item></Menu.Item>
                    </ProfileModal>
                  </Menu.ItemGroup>
                  <Menu.Item value="logout" onClick={logoutHandler}>
                    Logout
                  </Menu.Item>
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
