import React from 'react'
import { useState} from "react";
import {ReactComponent as NavLogo} from '../../resources/logo/navbarlogo.svg'
import './HeaderNav.css'
//component imports
import LogoutButton from '../../components/LogoutButton/LogoutButton'
import * as utils from "../../resources/utils/utils";

//material UI imports
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from "@mui/material/styles";
//material UI icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import TaskIcon from '@mui/icons-material/Task';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout'
//material icon utilities
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function HeaderNav({setUser,user,setResource}) {
    //get Avatar initials
    let firstInit= user.firstName
    let lastInit=user.lastName
    firstInit = firstInit.slice(0, 1);
    lastInit=lastInit.slice(0, 1);
    let avatarInit=firstInit.concat(lastInit)
    //set theme from utils
    let theme = utils.uiTheme();

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
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e.target.value)
    setAnchorEl(null);
  };

    //handle navigation on click
    const handleNavigation = (e)=>{setResource(e.target.value)}

return(
    
    <div className='header-nav'>
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Button><Avatar onClick={handleAvatarClick}>{avatarInit}</Avatar></Button>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >
                    <MenuItem name ='settings' onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                            <ListItemText>User Settings</ListItemText>
                    </MenuItem>
                    <MenuItem name='adminPanel' onClick={handleClose}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                            <ListItemText>Admin Panel</ListItemText>
                    </MenuItem>
                    <MenuItem name='logout' onClick={handleClose}><LogoutButton setUser={setUser}/>Logout</MenuItem>
                </Menu>
                <NavLogo style={{height:'5vh',width:'5vw'}}/>
                </div>

                <ToggleButtonGroup

                value={alignment}
                exclusive
                onChange={handleAlignment}color='secondary'
        
        >
               
                <ToggleButton
                value='dashboard'
                onClick={handleNavigation}
                >
                <DashboardIcon style={{pointerEvents: 'none'}}/>&nbsp;Dashboard
                </ToggleButton>
               

                <ToggleButton 
                value='tasks'                
                onClick={handleNavigation}>
                    <TaskIcon style={{pointerEvents: 'none'}}/>&nbsp;Tasks
                </ToggleButton>

                <ToggleButton variant="contained"
                value='projects'                
                onClick={handleNavigation}>
                    <TrackChangesIcon style={{pointerEvents: 'none'}}/>&nbsp;Projects
                </ToggleButton>
                </ToggleButtonGroup>

            <LogoutButton setUser={setUser}/>
            </Toolbar>
        
        </AppBar>
        </Box>
        </ThemeProvider>
    </div>
    )
}
