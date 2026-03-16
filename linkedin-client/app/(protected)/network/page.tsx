"use client";

import { useEffect } from "react";
import NetworkLeftSidebar from "../../../components/network/LeftSideBar/LeftSideBar";
import UserCard from "../../../components/network/UserCard/UserCard";
import LinkedInNavbar from "../../../components/Navbar/navbar";
import type { User } from "../../../redux/auth/authSlice";

import { Box, Paper, Avatar, Typography, Button } from "@mui/material";

import "./network.css";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUsers, clearUsers } from "@/redux/auth/authSlice";

export default function MyNetworkPage() {
  const dispatch = useAppDispatch();

  const { users, page, limit, total } = useAppSelector(
    (state: any) => state.authenticator,
  );
  console.log(users, "in network users");

  useEffect(() => {
    dispatch(clearUsers());
    dispatch(fetchUsers({ page: 1, limit }));
  }, []);

  return (
    <div className="my-network-wrapper">
      <LinkedInNavbar />

      <div className="my-network-container">
        <aside className="left-column">
          <NetworkLeftSidebar />
        </aside>

        <main className="main-column">
          <Paper className="suggestion-section">
            <div className="suggestion-header">
              <h3>Invitations</h3>
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Avatar src="/default-avatar.png" />

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Bhenkarr</Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#666",
                  }}
                >
                  Apdi bwe ka
                </Typography>
              </Box>

              <Button variant="outlined">Ignore</Button>
              <Button variant="contained">Accept</Button>
            </Box>
          </Paper>

          <div className="suggestion-section">
            <div className="suggestion-header">
              <h3>People you may know</h3>
            </div>

            <div className="suggestion-grid">
              {users.map((user: User) => (
                <UserCard key={`${user.id}-${user.userid}`} user={user} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
