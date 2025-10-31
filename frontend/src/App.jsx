import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/chats' element={<Chat/>}/>
    </Routes>
    </div>
  )
}

export default App
