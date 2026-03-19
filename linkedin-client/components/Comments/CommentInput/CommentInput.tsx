"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { addComment } from "../../../redux/comments/commentSlice";
import "./CommentInput.css";

const CommentInput = ({ postId, parentId }: any) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.authenticator);

  const submit = () => {
    if (!text.trim()) return;
    if (!currentUser) return;

    dispatch(
      addComment({
        postId,
        content: text,
        userId: currentUser.userid,
        userName: currentUser?.profileName ?? "Any User",
        profileUrl:
          currentUser.profileUrl ?? "https://i.pravatar.cc/150?img=12",
        parentId,
      }),
    );
    setText("");
  };

  return (
    <div className="comment-input-container">
      <img className="comment-avatar" src={currentUser?.profileUrl ?? ""} />
      <input
        className="comment-input-box"
        value={text}
        maxLength={500}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button className="comment-submit-btn" onClick={submit}>
        Comment
      </button>
    </div>
  );
};

export default CommentInput;
