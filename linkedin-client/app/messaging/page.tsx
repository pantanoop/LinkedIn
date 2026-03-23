"use client";

import "./messaging.css";

import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import LinkedInNavbar from "../../components/Navbar/navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/redux/auth/authSlice";
import { getSocket } from "../utility/socket";

export default function MessagingLayout() {
  const { currentUser, users } = useAppSelector(
    (state: any) => state.authenticator,
  );

  const dispatch = useAppDispatch();
  const socket = getSocket();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
      socket.emit("register", currentUser.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    setMessages([]);

    socket.emit("getMessages", {
      senderId: currentUser.userid,
      receiverId: selectedUser.userid,
    });

    const handleMessages = (msgs: any[]) => {
      setMessages(msgs);
    };

    socket.on("messages", handleMessages);

    return () => {
      socket.off("messages", handleMessages);
    };
  }, [selectedUser]);

  useEffect(() => {
    const handleNewMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUser || !currentUser) return;

    socket.emit("sendMessage", {
      senderId: currentUser.userid,
      receiverId: selectedUser.userid,
      text: messageText,
    });

    setMessageText("");
  };

  return (
    <>
      <LinkedInNavbar />

      <Box className="messaging-wrapper">
        <Box className="messaging-container">
          <Box className="conversation-panel">
            <Box className="conversation-header">
              <Typography fontWeight={600}>Messaging</Typography>

              <Box>
                <IconButton size="small">
                  <MoreHorizIcon />
                </IconButton>

                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>

            <Box className="search-bar">
              <SearchIcon fontSize="small" />
              <input placeholder="Search users" />
            </Box>

            <div className="user-list">
              {users?.map((user: any) => (
                <div
                  key={user.id}
                  className={`user-item ${
                    selectedUser?.id === user.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="user-avatar">
                    <Avatar src={user.profileUrl} />
                    {user.online && <span className="online-dot" />}
                  </div>

                  <strong>{user.profileName}</strong>
                </div>
              ))}
            </div>
          </Box>

          <Box className="chat-window">
            {selectedUser ? (
              <>
                <Box className="chat-header">
                  <Avatar src={selectedUser?.profileUrl} />
                  <Typography fontWeight={600}>
                    {selectedUser?.profileName}
                  </Typography>
                </Box>

                <div className="chat-messages">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id;

                    return (
                      <div
                        key={msg.id}
                        className={`message-row ${isMe ? "me" : "other"}`}
                      >
                        <div
                          className={`message-bubble ${
                            isMe ? "sent" : "received"
                          }`}
                        >
                          {msg.message}

                          <div className="msg-time">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Box className="chat-input-area">
                  <div className="chat-input">
                    <IconButton>
                      <SentimentSatisfiedAltIcon />
                    </IconButton>

                    <input
                      value={messageText}
                      placeholder="Type a message"
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                  </div>

                  <Box className="chat-actions">
                    <Box className="left-actions">
                      <IconButton size="small">
                        <ImageIcon />
                      </IconButton>

                      <IconButton size="small">
                        <AttachFileIcon />
                      </IconButton>
                    </Box>

                    <Button
                      variant="contained"
                      className="send-btn"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>Select a conversation</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
