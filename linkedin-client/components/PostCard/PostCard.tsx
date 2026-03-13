"use client";

import React, { useState } from "react";

import "./postcard.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { toggleLike, repost } from "../../redux/post/postSlice";
import CommentSection from "../Comments/CommentSection/CommentSection";
type PostCardProps = {
  postId: string;
  author: string;
  title: string;
  time: string;
  content: string;
  avatar?: string;
  mediaUrls?: string[];
  likeCount?: number;
  likedByUser?: boolean;
  type?: "post" | "repost";
  repostUser?: string;
  userId: string;
};

const PostCard: React.FC<PostCardProps> = ({
  postId,
  author,
  title,
  time,
  content,
  avatar,
  mediaUrls = [],
  likeCount,
  likedByUser,
  type,
  repostUser,
}) => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state: any) => state.authenticator);
  const [showComments, setShowComments] = useState(false);

  function handleLike(postId: string) {
    dispatch(toggleLike({ postId, userId: currentUser.userid }));
  }
  function handleRepost(postId: string) {
    dispatch(
      repost({
        postId,
        userName: currentUser.profileName,
      }),
    );
  }
  const renderMedia = (url: string, index: number) => {
    const isVideo =
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");

    if (isVideo) {
      return <video key={index} src={url} controls className="post-video" />;
    }

    return <img key={index} src={url} alt="post media" />;
  };

  //   const renderMedia = (url: string, index: number) => {
  //   if (url.match(/\.(mp4|webm|mov)$/i)) {
  //     return (
  //       <video key={index} src={url} controls className="post-video" />
  //     );
  //   }

  //   return <img key={index} src={url} alt="post media" />;
  // };
  return (
    <div className="dashboard-post">
      {type === "repost" && (
        <div className="repost-header">
          <strong>{repostUser}</strong> reposted this
        </div>
      )}
      <div className="post-header">
        <div className="post-avatar">
          <img src={avatar} alt="avatar" />
        </div>

        <div className="post-info">
          <h2 className="post-author">{author}</h2>

          <p className="post-title">{title}</p>
          <p className="post-time">{time} • 🌍</p>
        </div>
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      {mediaUrls.length > 0 && (
        <div
          className={`post-media ${
            mediaUrls.length === 1 ? "single-media" : "multi-media"
          }`}
        >
          {mediaUrls.map((url, index) => renderMedia(url, index))}
        </div>
      )}

      <div className="post-actions">
        <button className="action-btn" onClick={() => handleLike(postId)}>
          {likedByUser ? (
            <ThumbUpIcon className="action-icon" sx={{ color: "#0a66c2" }} />
          ) : (
            <ThumbUpOffAltIcon className="action-icon" />
          )}
          <span>{likeCount || 0} Like</span>
        </button>

        <button
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <ChatBubbleOutlineIcon className="action-icon" />
          <span>Comment</span>
        </button>

        <button className="action-btn" onClick={() => handleRepost(postId)}>
          <RepeatIcon className="action-icon" />
          <span>Repost</span>
        </button>

        <button className="action-btn">
          <SendIcon className="action-icon" />
          <span>Send</span>
        </button>
      </div>
      {showComments && (
        <div className="post-comments-wrapper">
          <CommentSection postId={postId} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
