import React, {useEffect, useState} from 'react'
import './MyStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon  from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SBSingleChat from './SBSingleChat';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import { FetchChats } from '../API/Chats';


function SideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lightMode = useSelector((state) => state.themeKey.value);
    const [chats, setChats] = useState([])

    useEffect(()=> {
        const fetchChats = async () => {
            try{
                const chats = await FetchChats()
                setChats(chats)
            } catch(error) {
                console.log("error"+error)
            }
        }

        fetchChats()

    }, [])

  return (
    <div class={"SideBar-container"}>
        <div class={"head-menu" + (lightMode ? "" : " dark")}>
            <div class="left-menu">
                <IconButton size="large">
                    <AccountCircleIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")}/>
                </IconButton>
            </div>
            <div class="right-menu">
                <div className='sb-search-icon'>
                    <IconButton size="medium">
                        <SearchIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")} />
                    </IconButton>
                </div>
                <IconButton size="large" onClick={()=>navigate('add-user')}>
                    <PersonAddIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")}/>
                </IconButton>
                <IconButton size="large" onClick={()=>navigate('join-group')}>
                    <GroupAddIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")}/>
                </IconButton>
                <IconButton size="large" onClick={()=>navigate('create-group')}>
                    <AddCircleIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")}/>
                </IconButton>
                <IconButton size="large" onClick={()=>dispatch(toggleTheme())}>
                    {lightMode && <DarkModeIcon fontSize="medium"/>}
                    {!lightMode && <LightModeIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")}/>}
                </IconButton>
            </div>
        </div>
        <div class={"search-bar" + (lightMode ? "" : " dark")}>
            <div class={"search-icon" + (lightMode ? "" : " dark")}>
                <IconButton size="medium">
                    <SearchIcon fontSize="medium" className={"icon"+ (lightMode ? "" : " dark")} />
                </IconButton>
            </div>
            <input class={"search" + (lightMode ? "" : " dark")} placeholder='Search' type='text'></input>
            <input class="online-button" type='button' value='Show Online Users'></input>
        </div>
        <div class={"chats" + (lightMode ? "" : " dark")}>
            {
                chats.map((chat)=> {
                    var chatName
                    if (chat.isGroup == false) {
                        if (chat.users[0].email==localStorage.getItem("Email")){
                            chatName = chat.users[1].name
                        }
                        else{
                            chatName = chat.users[0].name
                        }
                    }
                    return <SBSingleChat class={"chats" + (lightMode ? "" : " dark")} dpURL="" chatID={chat._id} Name={chatName} RecentMessage={chat.latestMessage ?? ""} TimeStamp="Today" isOnline={true}></SBSingleChat>
                })
            }
        </div>
    </div>
  )
}

export default SideBar