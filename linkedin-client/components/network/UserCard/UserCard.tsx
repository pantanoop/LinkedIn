/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import "./UserCard.css";

import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function UserCard({ user }: any) {
  console.log("user", user);
  return (
    <Paper elevation={0} className="suggestion-card">
      <Box className="cover-wrapper">
        <img
          src={user.coverUrl ? user.coverUrl : "/default-cover.jpg"}
          alt="cover"
          className="cover-image"
        />

        <IconButton className="close-btn" size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box className="avatar-wrapper">
        <Avatar
          src={user.profileUrl ? user.profileUrl : "/default-avatar.png"}
          className="avatar"
        />
      </Box>

      <Box className="card-body">
        <Typography className="name">
          {user.profileName || "LinkedIn User"}
        </Typography>

        <Typography className="headline">
          {user.userTitle || "No headline"}
        </Typography>

        <Typography className="followers">10 followers</Typography>

        <Button
          startIcon={<AddIcon />}
          className="follow-btn"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#1282f3" }}
        >
          Follow
        </Button>

        <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
          Connect
        </Button>
      </Box>
    </Paper>
  );
}
