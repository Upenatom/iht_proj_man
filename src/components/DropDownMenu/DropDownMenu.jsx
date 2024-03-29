
import { useState} from "react";
import Collapse from '@mui/material/Collapse';
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
import TuneIcon from '@mui/icons-material/Tune';
import Preferences from '../Modals/Preferences/Preferences'

export default function DropDownMenu({open,setAnchorEl,anchorEl,setUser,user,setResource}) {
    
    const[prefMenu,setPrefMenu]=useState(false)



    const handleClose = (e) => {
        setAnchorEl(null);
        
    };

  
    const handlePrefOpen = ()=>{
        setPrefMenu(true)
        handleClose()
        console.log(user.projPref)
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
        setResource('auditProj')
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

            <MenuItem value ='preferences' onClick={handlePrefOpen}>
                <ListItemIcon>
                <TuneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
                Preferences
            </ListItemText>
           
            </MenuItem>
         
        
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
                    <ListItemButton onClick={handleChangePassword} dense sx={{ pl: 3 }}>
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
                <List  component="div" disablePadding>
                    <ListItemButton  onClick={handleAddNewUser} dense sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add New User" />
                    </ListItemButton>
                     <ListItemButton onClick={handleEditUser} dense sx={{ pl: 3 }}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit User" />
                    </ListItemButton>
                    <ListItemButton name='Audit Projects' onClick={handleAuditProjects}sx={{ pl: 3 }} dense  >
                        <ListItemIcon>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Audit Projects" />
                    </ListItemButton>
                </List>
            </Collapse>
      
        </Menu>
        <Preferences
        user={user}        
        setPrefMenu={setPrefMenu}
        prefMenu={prefMenu}
        handleClose={handleClose}
        setUser={setUser}
        />
    </div>
  )
}
