"use client";

import { useState } from "react";
import CommentInput from "../CommentInput/CommentInput";
import "./CommentItem.css";
const CommentItem = ({ comment, postId }: any) => {
  const [showReply, setShowReply] = useState(false);
  console.log(comment, "fehkghj");
  return (
    <div className="comment-item-container">
      <img className="comment-user-avatar" src={comment.profileUrl} />

      <div className="comment-body">
        <div className="comment-bubble">
          <div className="comment-username">{comment.userName}</div>
          <div className="comment-text">{comment.content}</div>
        </div>

        <div className="comment-actions">
          <button>Like</button>
          <button onClick={() => setShowReply(!showReply)}>Reply</button>
        </div>

        {showReply && (
          <div className="reply-section">
            <CommentInput postId={postId} parentId={comment.commentId} />
          </div>
        )}

        {comment.replies?.length > 0 && (
          <div className="reply-section">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.commentId}
                comment={reply}
                postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
