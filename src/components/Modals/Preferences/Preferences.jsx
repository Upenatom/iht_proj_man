import { useState,useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import * as utils from '../../../resources/utils/utils'

export default function Preferences({prefMenu,setPrefMenu,handleClose,user,setUser}) {

    //Project view preferencechange and on load
    const [projView, setProjView] = useState(user.projPref)
    const [prefChangeTrigger,setPrefChangeTrigger] =useState(false)
    
    useEffect(()=>{},[prefChangeTrigger])

    const projViewChange= (e)=> {
        setProjView(e.target.value)
    }

    const handlePrefClose = ()=>{setPrefMenu(false)
    }
    const handlePrefCancel = ()=>{
        setPrefMenu(false)
        setProjView(user.projPref)
    }

    const handleSubmitPrefs=async()=>{
        let body = {projView:projView}
        let options=utils.putBuilder(body)
        try{
            const fetchResponse = await fetch(`/api/users/update/prefs/${user._id}`, options)
            if(!fetchResponse.ok)
        { throw new Error('Fetch failed - Bad Request')}
        setPrefChangeTrigger(!prefChangeTrigger)
        handlePrefClose()
        setUser({...user,projPref:projView})
        }
        catch(err){console.log(err)}

       
    }

  return (
    <div>
        <Dialog open={prefMenu}
        onClose={handlePrefClose}
        >
     <DialogTitle>Preferences Menu</DialogTitle>
     <DialogContent>
        <DialogContentText>
            <FormControl>
                <FormLabel>Project View</FormLabel>
                <RadioGroup
                row
                name="project-view-preference"
                value={projView}
                onChange={projViewChange}
                >
                    <FormControlLabel value="list" control={<Radio />} label="List" />
                    <FormControlLabel value="gantt" control={<Radio />} label="Timeline" />

      </RadioGroup>
            </FormControl>
         </DialogContentText>
         <DialogActions> 
            <Button variant='contained' onClick={handleSubmitPrefs}>Save and Exit</Button>
            <Button variant='contained' onClick={handlePrefCancel}>Cancel</Button></DialogActions>

     </DialogContent>
  </Dialog>
    </div>
  )
}
