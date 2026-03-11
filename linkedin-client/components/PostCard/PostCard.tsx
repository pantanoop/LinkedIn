"use client";
import React from "react";
import "./postcard.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { toggleLike } from "../../redux/post/postSlice";
type PostCardProps = {
  postId: string;
  author: string;
  title: string;
  time: string;
  content: string;
  avatar?: string;
  imageUrls?: string[];
  likeCount?: number;
  likedByUser?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  postId,
  author,
  title,
  time,
  content,
  avatar,
  imageUrls = [],
  likeCount,
  likedByUser,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="dashboard-post">
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

      {imageUrls.length > 0 && (
        <div
          className={`post-images ${
            imageUrls.length === 1 ? "single-image" : "multi-image"
          }`}
        >
          <div className="left-image">
            <img src={imageUrls[0]} alt="post" />
          </div>

          {imageUrls.length > 1 && (
            <div className="right-images">
              {imageUrls.slice(1).map((img, index) => (
                <img key={index} src={img} alt="post" />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="post-actions">
        <button
          className="action-btn"
          onClick={() => dispatch(toggleLike(postId))}
        >
          <ThumbUpOffAltIcon
            className="action-icon"
            style={{ color: likedByUser ? "#0a66c2" : "" }}
          />
          <span>{likeCount || 0} Like</span>
        </button>

        <button className="action-btn">
          <ChatBubbleOutlineIcon className="action-icon" />
          <span>Comment</span>
        </button>

        <button className="action-btn">
          <RepeatIcon className="action-icon" />
          <span>Repost</span>
        </button>

        <button className="action-btn">
          <SendIcon className="action-icon" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
