import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/layout'
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import {BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/chatProvider'
import ProfileModal from './ProfileModal'
import {  useNavigate } from 'react-router-dom'

const SideDrawer = () => {
    const [serch, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const { user } = ChatState();

    const Navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        Navigate('/')
    }

  return (
    <>
    <Box display="flex" justifyContent="space-between" bg="white" alignItems="center" borderWidth="5px" w="100%" p="5px 10px">
        <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
            <Button variant='ghost'>
               <i class="fa-solid fa-magnifying-glass"></i>
               <Text display={{ base: 'none', md: 'flex' }} px={4}>Search User</Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">Chat App</Text>

        <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon m={1} fontSize={"2xl"}></BellIcon>
                </MenuButton>
                {/* <MenuList>

                </MenuList> */}
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size='sm' cursor="pointer" name={user.name} src={user.pic}></Avatar>
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModal>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
    </Box>
    </>
  )
}

export default SideDrawer