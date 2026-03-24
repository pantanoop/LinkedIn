"use client";

import "./UserList.css";
import { Box, Typography, IconButton, Avatar } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";

export default function UserList({
  users,
  selectedUser,
  setSelectedUser,
}: any) {
  return (
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
              selectedUser?.userid === user.userid ? "active" : ""
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
  );
}
