"use client";

import React, { useState } from "react";
import "./postcard.css";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import { timeAgo } from "../../app/utility/timeAgo";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { toggleLike, repost, fetchPosts } from "../../redux/post/postSlice";

import CommentSection from "../Comments/CommentSection/CommentSection";
import { Avatar } from "@mui/material";

type PostCardProps = {
  postId: string;
  author: string;
  title: string;
  time: string;
  content: string;
  avatar?: string;
  mediaUrls?: string[] | string;
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
  mediaUrls,
  likeCount,
  likedByUser,
  type,
  repostUser,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  const [showComments, setShowComments] = useState(false);

  const mediaArray: string[] = (() => {
    if (Array.isArray(mediaUrls)) return mediaUrls;

    if (typeof mediaUrls === "string") {
      return mediaUrls
        .replace(/[{}]/g, "")
        .split(",")
        .map((url) => url.replace(/"/g, "").trim())
        .filter(Boolean);
    }

    return [];
  })();

  const isVideoPost = mediaArray.some((url) => url.match(/\.(mp4|webm|mov)$/i));

  function handleLike(postId: string) {
    dispatch(toggleLike({ postId, userId: currentUser.userid }));
  }

  function handleRepost(postId: string) {
    dispatch(
      repost({
        postId,
        userName: currentUser.profileName,
      }),
    ).then(() => {
      dispatch(fetchPosts());
    });
  }

  const renderMedia = () => {
    if (isVideoPost) {
      return (
        <div className="post-video-wrapper">
          <video src={mediaArray[0]} controls className="post-video" />
        </div>
      );
    }
    if (mediaArray.length === 1) {
      return (
        <div className="post-single-image">
          <img src={mediaArray[0]} alt="post media" />
        </div>
      );
    }
    return (
      <div className="post-masonry">
        {mediaArray.map((url, index) => (
          <img
            key={url + index}
            src={url}
            alt="post media"
            loading="lazy"
            className="post-masonry-img"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-post">
      {type === "repost" && (
        <div className="repost-header">
          <strong>{repostUser}</strong> reposted this
        </div>
      )}

      <div className="post-header">
        <div className="post-avatar">
          {avatar && <Avatar src={avatar ?? ""} alt="user" />}
        </div>

        <div className="post-info">
          <h2 className="post-author">{author}</h2>
          <p className="post-title">{title}</p>
          <p className="post-time">{timeAgo(time)}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      {mediaArray.length > 0 && renderMedia()}

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
