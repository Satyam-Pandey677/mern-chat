import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const ChatContext = createContext()

const ChatProvider = ({children}) => {
    
    const [user, setUser] = useState()
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo){
            console.log("user not available")
        }
    },[])

    const value = {
        user,
        setUser
    } 
  return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider


export const ChatState = () => useContext(ChatContext)