import React, { createContext, useContext, useEffect, useState } from 'react'


const ChatContext = createContext()

const ChatProvider = ({children}) => {
    
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState()
    const [notification, setNotification] = useState([])
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo){
            console.log("user not available")
        }
    },[])

    const value = {
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification
    } 
  return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider


export const ChatState = () => useContext(ChatContext)