import { useState, useEffect} from "react";
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchUser from '../Modals/SearchUser/SearchUser'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as utils from '../../resources/utils/utils'
import './AuditSearchHeader.css'



export default function SearchHeader({filter1,setFilter1,filter2,setFilter2,getFilteredProjects,showInactive,setShowInactive}) {
  


  const [editUser,setEditUser]=useState({firstName:"",lastName:"",userName:"",userPass:"",department:"",authLevel:"",statusLevel:'active'})

    //autocomplete selection
    const[allUsers, setAllUsers]=useState([])
    
    

  const handlSelectChange = (e) => {
    if(e.target.value==='All'){
      setFilter1(null)
    }
    setFilter1(e.target.value);
    setFilter2(null)
  };
  const handlSelectChange2 = (e) => {
    setFilter2(e.target.value);
  };

  //switch show inactive projects controls
  const handleSwitchChange = ()=>{setShowInactive(!showInactive)}




  return (
    <div className='searchselectsdiv'>
      <div style={{display:'flex', flexDirection:'row',width:'600px'}}>
     <FormControl fullWidth>
     <InputLabel >Filter By...</InputLabel>
      <Select
      defaultValue=''
      autoWidth='true'
      label="Filter"
      value={filter1}
      onChange={handlSelectChange}>
      <MenuItem value={'All'}>All</MenuItem>
      <MenuItem value={'projOwner'}>Project Manager</MenuItem>
        <MenuItem value={'projDivision'}>Division</MenuItem>
        
        <MenuItem value={'projDepartment'}>Department</MenuItem>
        </Select>
        </FormControl> &nbsp;


        {filter1!==null?<></>:null}
       
    
       
         {filter1==='projDivision'?
          <FormControl fullWidth >
     <InputLabel >Select...</InputLabel>
      <Select
      defaultValue=''
      autoWidth='true'
      label="Divisions"
      value={filter2}
      onChange={handlSelectChange2}>
        <MenuItem sx={{display:'flex', flexDirection:'row', alignItems:'center'}} value={'IHTheating'}>{utils.logoSelect('IHTheating')}&nbsp;IHT Heating</MenuItem>
        <MenuItem sx={{display:'flex', alignItems:'center'}} value={'IHTcooling'}>{utils.logoSelect('IHTcooling')} &nbsp; IHT Cooling</MenuItem>
        <MenuItem sx={{display:'flex', alignItems:'center'}} value={'IHTlighting'}> {utils.logoSelect('IHTlighting')} &nbsp; IHT Lighting</MenuItem>
        <MenuItem sx={{display:'flex', alignItems:'center'}} value={'IHTplastic'}>{utils.logoSelect('IHTplastic')} &nbsp; IHT Plastics</MenuItem>
        <MenuItem sx={{display:'flex', alignItems:'center'}} value={'IHTgroup'}>{utils.logoSelect('IHTgroup')} &nbsp; IHT Group</MenuItem>
        </Select></FormControl> :null}

      {filter1==='projOwner'?
       <FormControl fullWidth >
     <SearchUser
     setEditUser={setEditUser}
     allUsers={allUsers}
     setAllUsers={setAllUsers}
     setUser={setFilter2}
     />
     </FormControl>:null}

      {filter1==='projDepartment'?
       <FormControl fullWidth>
     <InputLabel >Select...</InputLabel>
      <Select
      autoWidth='true'
      label="Divisions"
      value={filter2}
      onChange={handlSelectChange2}>
        {utils.departmentEnums().map((department)=><MenuItem value={department}>{department}</MenuItem>)}
               </Select></FormControl>
     :null}

      
      </div>
      {filter2? <><FormControlLabel
      control={<Switch onChange={handleSwitchChange}/>} label='Show Inactive?' 
  /><Button onClick={getFilteredProjects} variant='contained'> Search</Button></>:null}
  {filter1==='All'? <><FormControlLabel
      control={<Switch onChange={handleSwitchChange}/>} label='Show Inactive?' 
  /><Button onClick={getFilteredProjects} variant='contained'> Search</Button></>:null}
      
    </div>
  )
}
