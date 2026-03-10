"use client";
import React from "react";
import "./postcard.css";

type PostCardProps = {
  author: string;
  title: string;
  time: string;
  content: string;
  avatar?: string;
};

const PostCard: React.FC<PostCardProps> = ({
  author,
  title,
  time,
  content,
  avatar = "JD",
}) => {
  return (
    <div className="dashboard-post">
      <div className="post-header">
        <div className="post-avatar">{avatar}</div>

        <div className="post-info">
          <h2 className="post-author">{author}</h2>
          <p className="post-title">{title}</p>
          <p className="post-time">{time} • 🌍</p>
        </div>
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      <div className="post-image">Next.js Build Successful!</div>

      <div className="post-actions">
        <button className="action-btn">Like</button>
        <button className="action-btn">Comment</button>
        <button className="action-btn">Repost</button>
        <button className="action-btn">Send</button>
      </div>
    </div>
  );
};

export default PostCard;
