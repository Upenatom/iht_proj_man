import * as utils from '../../resources/utils/utils'
import { Box} from '@mui/system'
export default function CommentItem({comment}) {
  let created = comment.createdAt
  let edited = comment.updatedAt
  let user = comment.taskCommentOwner
  return (
    <div>
      <Box sx={{
          fontSize:'12px',color:'text.secondary',fontWeight:'light',fontStyle:'italic'
        }}>
      <p>Created:&nbsp;{utils.shortDate(created)}&emsp;Edited:&nbsp;{utils.shortDate(edited)}&emsp;By:&nbsp;{user["firstName"]} {user["lastName"]}</p></Box>
      <p>{comment.comment}</p>
    </div>
  )
}
