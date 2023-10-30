import React from 'react'

export default function CommentItem({comment}) {
  let created = comment.createdAt
  let edited = comment.updatedAt
  let user = comment.taskCommentOwner
  return (
    <div>
      <p>Created:{created} Edited:{edited} By:{user["firstName"]} {user["lastName"]}</p>
      <p>{comment.comment}</p>
    </div>
  )
}
