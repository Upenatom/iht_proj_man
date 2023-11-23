import { useState, useEffect} from "react";
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './AuditSearchHeader.css'



export default function SearchHeader() {
  const[filter1,setFilter1]=useState(null)
  const[filter2,setFilter2]=useState(null)
  const[filter1Value,setFilter1Value]=useState(null)
  const[filter2Value,setFilter2Value]=useState(null)

  const handlSelectChange = (e) => {
    setFilter1(e.target.value);
  };
  const handlSelectChange2 = (e) => {
    setFilter2(e.target.value);
  };

  function autocompFilter1(){
    if (filter1==='projDivision'){
      
    }
    return
  }
  //search porjects by:
//Name
//Status
//Divisions
//Department for Superadmins.  For admins only show for your department
//Project Manager
//Project Status

  return (
    <div className='searchselectsdiv'>
      <div style={{display:'flex', flexDirection:'row', }}>
      Search By: 
      <FormControl fullWidth>
     <InputLabel >Filter By...</InputLabel>
      <Select
      autoWidth='true'
      label="Filter"
      value={filter1}
      onChange={handlSelectChange}>
        <MenuItem value={'projDivision'}>Division</MenuItem>
        <MenuItem value={'projOwner'}>Project Manager</MenuItem>
        <MenuItem value={'projDepartment'}>Department</MenuItem>
        </Select>
        </FormControl> &nbsp;
        {filter1!==null?<>
       
       <FormControl fullWidth>
        <InputLabel >Refine By...</InputLabel>
         {filter1==='projDivision'?
      <>
      <Select
        autoWidth='true'
        label="Refine"
        value={filter2}
        onChange={handlSelectChange2}>
        <MenuItem value={'projOwner'}>Project Manager</MenuItem>
        <MenuItem value={'projDepartment'}>Department</MenuItem></Select></>:null}
      {filter1==='projOwner'?
      <>
      <Select
        autoWidth='true'
        label="Refine"
        value={filter2}
        onChange={handlSelectChange2}>
        <MenuItem value={'projDivision'}>Division</MenuItem>
        <MenuItem value={'projDepartment'}>Department</MenuItem></Select></>:null}
        {filter1==='projDepartment'?
      <><Select
        autoWidth='true'
        label="Refine"
        value={filter2}
        onChange={handlSelectChange2}>
         <MenuItem value={'projOwner'}>Project Manager</MenuItem>
        <MenuItem value={'projDivision'}>Division</MenuItem></Select></>:null}
      
      </FormControl></>:null}
      </div>
      <Button variant='contained'> Search</Button>
    </div>
  )
}
