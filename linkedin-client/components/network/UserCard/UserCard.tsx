"use client";

import "./UserCard.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  toggleFollowUser,
  toggleConnectionUser,
} from "../../../redux/auth/authSlice";

export default function UserCard({ user }: any) {
  const { currentUser, followingMap, connectionMap } = useAppSelector(
    (state: any) => state.authenticator,
  );
  const isFollowing = followingMap[user.id];
  const connection = connectionMap?.[user.id];
  const connectionStatus = connection?.status || "NONE";
  const dispatch = useAppDispatch();
  function handleFollow() {
    if (!currentUser?.id || !user?.id) return;
    const data = {
      followerId: currentUser.id,
      followingId: user.id,
    };
    dispatch(toggleFollowUser(data));
  }
  function handleConnect() {
    if (!currentUser?.id || !user?.id) return;
    const data = {
      currentUserId: currentUser.id,
      targetUserId: user.id,
    };
    dispatch(toggleConnectionUser(data));
  }
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
        <Typography className="followers">
          {user.followersCount} followers
        </Typography>
        <Button
          className="follow-btn"
          variant="contained"
          startIcon={isFollowing ? "" : <AddIcon />}
          fullWidth
          sx={{ backgroundColor: "#1282f3" }}
          onClick={() => handleFollow()}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>

        <Button
          className="follow-btn"
          startIcon={<GroupAddIcon />}
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => handleConnect()}
        >
          {connectionStatus === "NONE" && "Connect"}
          {connectionStatus === "PENDING" && "Pending"}
          {connectionStatus === "ACCEPTED" && "Connected"}
        </Button>
      </Box>
    </Paper>
  );
}
