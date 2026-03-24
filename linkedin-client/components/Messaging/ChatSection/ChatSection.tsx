"use client";

import "./ChatSection.css";

import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import { useRef } from "react";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { uploadToCloudinary } from "../../../app/utility/cloudinary";

export default function ChatSection({ selectedUser, socket }: any) {
  const { currentUser } = useAppSelector((state: any) => state.authenticator);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    setMessages([]);

    socket.emit("getMessages", {
      senderId: currentUser.userid,
      receiverId: selectedUser.userid,
    });

    socket.on("messages", setMessages);

    return () => socket.off("messages");
  }, [selectedUser]);

  useEffect(() => {
    socket.on("newMessage", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!selectedUser || !currentUser) return;
    if (!messageText.trim() && selectedImages.length === 0) {
      return;
    }

    let mediaUrls: string[] = [];

    if (selectedImages.length > 0) {
      mediaUrls = await uploadToCloudinary(selectedImages);
    }

    socket.emit("sendMessage", {
      senderId: currentUser.userid,
      receiverId: selectedUser.userid,
      text: messageText,
      mediaUrls,
    });

    setMessageText("");
    setSelectedImages([]);
    setPreviewUrls([]);
  };

  if (!selectedUser) {
    return (
      <Box className="empty-chat">
        <Typography>Select a User</Typography>
      </Box>
    );
  }

  const handleEmojiClick = (emojiData: any) => {
    setMessageText((prev) => prev + emojiData.emoji);
  };

  return (
    <Box className="chat-window">
      <Box className="chat-header">
        <Avatar src={selectedUser.profileUrl} />
        <Typography fontWeight={600}>{selectedUser.profileName}</Typography>
      </Box>

      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser?.userid;

          return (
            <div
              key={msg.id}
              className={`message-row ${isMe ? "me" : "other"}`}
            >
              {msg.mediaUrls?.map((url: string, i: number) => (
                <img key={i} src={url} className="chat-image" />
              ))}

              {msg.message && (
                <div className={`message-bubble ${isMe ? "sent" : "received"}`}>
                  {msg.message}

                  <div className="msg-time">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {previewUrls.length > 0 && (
        <div className="preview-container">
          {previewUrls.map((url, index) => (
            <div key={index} className="preview-item">
              <img src={url} />

              <button
                className="remove-image-btn"
                onClick={() => {
                  setSelectedImages((prev) =>
                    prev.filter((_, i) => i !== index),
                  );
                  setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <Box className="chat-input">
        <IconButton component="label">
          <ImageIcon />
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            hidden
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedImages(files);
              setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
            }}
          />
        </IconButton>
        <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
          <SentimentSatisfiedAltIcon />
        </IconButton>

        <IconButton component="label">
          <AttachFileIcon />
        </IconButton>

        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />

        <Button onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
}
