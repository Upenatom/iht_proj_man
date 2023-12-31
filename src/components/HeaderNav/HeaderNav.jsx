import React from 'react'
import { useState} from "react";

import {ReactComponent as NavLogo} from '../../resources/logo/navbarlogo.svg'
import './HeaderNav.css'
//component imports
import LogoutButton from '../../components/LogoutButton/LogoutButton'
import * as utils from "../../resources/utils/utils";
import DropDownMenu from '../DropDownMenu/DropDownMenu'
//material UI imports

import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider } from "@mui/material/styles";
//material UI icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import TaskIcon from '@mui/icons-material/Task';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';

//material icon utilities
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



export default function HeaderNav({setUser,user,setResource,resource}) {
    //get Avatar initials
    let theme
    let firstInit= user.firstName
    let lastInit=user.lastName
    firstInit = firstInit.slice(0, 1);
    lastInit=lastInit.slice(0, 1);
    let avatarInit=firstInit.concat(lastInit)
    //set theme from utils
    if (resource ==='editUser'||resource ==='addUser'||resource ==='auditProj'){
        theme = utils.adminTheme()
    }else{
    theme = utils.uiTheme();}

    //highlight and un highlight navbar buttons
    const [alignment, setAlignment] = useState('dashboard');

    //anchor avatar menu
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
     const open = Boolean(anchorEl);
    //handle avatarclick
    const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget)
    };


    //handle navigation on click
    const handleNavigation = (e)=>{
        setResource(e.target.value)
    }

return(
    
    <div className='header-nav'>
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent:'space-between'}}>
                
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Button><Avatar onClick={handleAvatarClick}>{avatarInit}</Avatar></Button>
                <DropDownMenu
                open={open}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                setUser={setUser}
                setResource={setResource}
                user={user}/>
                
                <NavLogo style={{height:'5vh',width:'5vw'}}/>
                </div>

                {resource ==='editUser'||resource ==='addUser'||resource ==='auditProj'?
                 <ToggleButtonGroup

                value={alignment}
                exclusive
                onChange={handleAlignment}color='secondary'>
                
                <ToggleButton
                value='dashboard'
                onClick={handleNavigation}
                style={{color:'black'}}>
                Exit Admin Mode
                </ToggleButton>
                </ToggleButtonGroup>:

                <ToggleButtonGroup

                value={alignment}
                exclusive
                onChange={handleAlignment}color='secondary'>
               
                <ToggleButton
                value='dashboard'
                onClick={handleNavigation}>
                <DashboardIcon style={{pointerEvents: 'none'}}/>&nbsp;My Dashboard
                </ToggleButton>
               

                <ToggleButton 
                value='tasks'                
                onClick={handleNavigation}>
                    <TaskIcon style={{pointerEvents: 'none'}}/>&nbsp;My Tasks
                </ToggleButton>

                <ToggleButton variant="contained"
                value='projects'                
                onClick={handleNavigation}>
                    <TrackChangesIcon style={{pointerEvents: 'none'}}/>&nbsp;My Projects
                </ToggleButton>
                </ToggleButtonGroup>}

            <LogoutButton setUser={setUser}/>
            </Toolbar>
        
        </AppBar>
        </Box>
        </ThemeProvider>
    </div>
    )
}
