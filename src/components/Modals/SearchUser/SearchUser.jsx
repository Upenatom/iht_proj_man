import { useState,useEffect} from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as fetches from '../../../resources/utils/fetches'
//returns a user ID with the setUser function
export default function SearchUser({allUsers,setAllUsers,setUser, user}) {
    //save user to state
    const selectedUser=(value)=>{
    value?setUser(value._id):setUser([])}
    
   

    //autocomplete selection

    const [open, setOpen] = useState(false);
    const loading = open && allUsers.length === 0;

    

    useEffect(()=>{
        let active= true
        if (!loading) {
            return undefined;
    }
    
    (async () => {
      

      if (active) {
        fetchAllUsers()
      }
    })();

    return () => {
      active = false;
    };
    },[loading])

    useEffect(() => {
    if (!open) {
      setAllUsers([]);
    }
  }, [open]);

const fetchAllUsers = async ()=>{
        
        try{
            const options=fetches.getFetchOptions()
            const fetchResponse = await fetch ('/api/users/index',options);
            if (!fetchResponse.ok) {
                throw new Error("Fetch failed - Bad Request");
            }
            let userArray = await fetchResponse.json()
            setAllUsers(userArray)
        }
        
        catch(err){
            console.log(err);
            console.log("User By department Fetch failed")
        }
    }

  return (
    <div>
         <Autocomplete 
         
        id ='user search'
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onChange={(event,value)=>{selectedUser(value)}}
        onClose={() => {
        setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.fullName === value.fullName}
        getOptionLabel={(option) =>  option.fullName
            }
        options={allUsers}
        loading={loading}
        renderInput={(params) => (
             <TextField
              {...params}
              label={user}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          />
      )}/>
    </div>
  )
}
