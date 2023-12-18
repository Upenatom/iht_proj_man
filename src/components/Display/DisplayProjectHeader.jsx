import IconButton from '@mui/material/IconButton';

import SwapVertIcon from '@mui/icons-material/SwapVert';

import './DisplayProjectHeader.css'
export default function ProjectHeader({
  
}) {

  
  
  return (
    <div className='displayprojectsdiv'>
   
    <div className ='displayprojecttableheaders'style={{backgroundColor:'#646687',color:'#c5c7d5'}}>     

      Upcoming Projects
       
    </div>
    <div className ='displayprojecttableheaders' style={{backgroundColor:'#ee938f',color:'#b10001'}}>
     

      Overdue Projects
       
    </div>
   
      
      </div>
  )
}