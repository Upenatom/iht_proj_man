
import { useState} from "react";
import LogoutButton from '../../components/LogoutButton/LogoutButton'
import Collapse from '@mui/material/Collapse';
import { ThemeProvider } from "@mui/material/styles";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockResetIcon from '@mui/icons-material/LockReset';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GradingIcon from '@mui/icons-material/Grading';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function DropDownMenu({open,setAnchorEl,anchorEl,setUser,user,setResource}) {
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    
    const handleMenuItemClick = (e)=>{
        setAnchorEl(false)
    console.log(e.currentTarget.value)
    }
    //account settings expand menu
    const[accSet,setAccSet]=useState(false)
    const handleAccSetExp = ()=>{
        setAccSet(!accSet)
    }

    //admin panel expand menu
    const[adminPan,setAdminPan]=useState(false)
    const handleAdminPanExp = ()=>{
        setAdminPan(!adminPan)
    }

    const handleAuditProjects = ()=>{
        setAnchorEl(false)
    }

    const handleEditUser = ()=>{
        setResource('editUser')
        setAnchorEl(false)
    }
    const handleAddNewUser=()=>{
        setResource('addUser')
        setAnchorEl(false)
    }
    const handleChangePassword=()=>{
        setResource('changePass')
        setAnchorEl(false)

    }


  return (
    //anchor avatar menu
    
    <div>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        
        <MenuItem value ='settings' onClick={handleAccSetExp}>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                Account Settings
            </ListItemText>                          {accSet ?<ExpandLess />:<ExpandMore />}
            </MenuItem>
            <Collapse in={accSet} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={handleChangePassword}dense ='true'sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <LockResetIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change Pasword" />
                    </ListItemButton>
                </List>
            </Collapse>
            
            {/* admin panel */}
            {user.authLevel ==='superadmin' || user.authLevel ==='admin'?
            <MenuItem name='adminPanel' onClick={handleAdminPanExp}>
                <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Admin Panel</ListItemText>
                {adminPan ?<ExpandLess />:<ExpandMore />}
            </MenuItem>:null}


            <Collapse in={adminPan} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton  onClick={handleAddNewUser} dense ='true'sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add New User" />
                    </ListItemButton>
                     <ListItemButton onClick={handleEditUser} dense ='true' sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit User" />
                    </ListItemButton>
                    <ListItemButton name='Audit Projects' onClick={handleAuditProjects}sx={{ pl: 3 }} dense ='true' >
                        <ListItemIcon>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Audit Projects" />
                    </ListItemButton>
                </List>
            </Collapse>
            <MenuItem name='logout' onClick={handleMenuItemClick}>
                <LogoutButton setUser={setUser}/>Logout
            </MenuItem>
        </Menu>
    </div>
  )
}
