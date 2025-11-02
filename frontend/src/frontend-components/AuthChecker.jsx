import Home from '../pages/Home'
import { ChatState } from '../context/chatProvider'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthChecker = () => {

    const naviagte = useNavigate()

    const {user} = ChatState()
  return (
    <>
        {user? (<Outlet/>): (<Home/>)}
    </>
  )
}

export default AuthChecker