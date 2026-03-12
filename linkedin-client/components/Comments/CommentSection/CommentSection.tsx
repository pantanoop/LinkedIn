"use client";

import { useEffect } from "react";
import "./CommentSection.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { fetchComments } from "../../../redux/comments/commentSlice";
import CommentItem from "../CommentItem/CommentItem";
import CommentInput from "../CommentInput/CommentInput";

const CommentSection = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(
    (state: any) => state.comments.commentsByPost[postId] || [],
  );

  useEffect(() => {
    if (!comments.length) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  return (
    <div className="comment-section-container">
      <CommentInput postId={postId} />

      {comments.map((comment: any) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
        />
      ))}
    </div>
  );
};

export default CommentSection;
