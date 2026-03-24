"use client";

import "./messaging.css";
import LinkedInNavbar from "../../components/Navbar/navbar";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUsers } from "@/redux/auth/authSlice";
import { getSocket } from "../utility/socket";

import UserList from "../../components/Messaging/UserList/UserList";
import ChatSection from "../../components/Messaging/ChatSection/ChatSection";

import { Box, Paper, Typography, Button } from "@mui/material";

export default function MessagingLayout() {
  const { currentUser, users } = useAppSelector(
    (state: any) => state.authenticator,
  );

  const dispatch = useAppDispatch();
  const socket = getSocket();

  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    socket.connect();

    socket.on("connect", () => {
      socket.emit("register", currentUser.userid);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  return (
    <>
      <LinkedInNavbar />

      <Box className="messaging-wrapper">
        <Box className="messaging-main">
          <Box className="messaging-container">
            <UserList
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />

            <ChatSection selectedUser={selectedUser} socket={socket} />
          </Box>

          <Box className="right-panel">
            <Paper elevation={1} className="job-banner">
              <Typography className="job-banner-top">
                Linked<span>in</span>
              </Typography>

              <Typography className="job-banner-title">
                Your job search powered by your network
              </Typography>

              <Button variant="contained" className="explore-btn">
                Explore jobs
              </Button>

              <Box className="job-banner-image">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4D12AQHm9_g5--_eVA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1644765112983?e=2147483647&v=beta&t=CVTxNl_nwX2gKgEHjC3gxAmTXdel1U-61Gm6GoSdzGw"
                  alt="Job promotion"
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
