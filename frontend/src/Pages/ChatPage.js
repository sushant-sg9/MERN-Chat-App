import React, { useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { Box } from '@chakra-ui/layout'
import SideDrawer from '../Component/miscellaneous/SideDrawer'
import MyChats from '../Component/miscellaneous/MyChats'
import ChatBox from '../Component/miscellaneous/ChatBox'
// import { useStatStyles } from '@chakra-ui/react'


const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
   
  return (
    <div style={{width:'100%'}}>
      {user && <SideDrawer/>}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && (<MyChats fetchAgain={fetchAgain} />) }
        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
      </Box>
    </div>

  )
}

export default ChatPage