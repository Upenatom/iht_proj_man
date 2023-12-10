import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import './AuditProjectHeader.css'
export default function ProjectHeader({
  // handleClickOpen,
  onClickSort,
  // filter,
  // setFilter
}) {

  
  // const handleChange=(e)=>{
  //   setFilter(e.target.value)
  // }

  return (
    <div className='auditprojectsdiv'>
    {/* <div className='auditprojaddandtitle' ><div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>PROJECTS<IconButton onClick={handleClickOpen} color= 'success'><AddCircleIcon /></IconButton></div> 

    <div style={{display:'flex',alignItems:'center'}}>Project Filter:&nbsp;<FormControl sx={{paddingRight:'10px'}}>
        <InputLabel id="select filter"></InputLabel>
        <Select sx={{height:'40px'}}
          autoWidth
          labelId="select filter"
          id="demo-simple-select"
          value={filter}
          defaultValue='Active'
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'Inactive'}>Inactive</MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
        </Select>
      </FormControl></div>
    

  
  </div> */}
    <div className ='projecttableheaders'>
     

      <div className='columntitle' style={{width:'350px',display:'flex',flexDirection:'row',alignItems:'center'}}
      >Name<IconButton name='name' size='small' 
      onClick={onClickSort}
      ><SwapVertIcon/></IconButton></div>

      <div className='columntitle' style={{width:'80px',display:'flex',flexDirection:'row',alignItems:'center'}}
      >Status<IconButton name='status'size='small'
       onClick={onClickSort}
       >
        <SwapVertIcon/></IconButton></div>

      <div className='columntitle' style={{width:'270px',display:'flex',flexDirection:'row',alignItems:'center'}}       
      >Due Date<IconButton size='small' 
      name='date'
      onClick={onClickSort}
      ><SwapVertIcon/></IconButton></div>
       
    </div>
   
      
      </div>
  )
}