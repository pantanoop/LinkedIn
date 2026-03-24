"use client";

import "./leftSidebar.css";

import { Box, Paper, Avatar, Typography } from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function LeftSidebar() {
  const { currentUser } = useAppSelector((state: any) => state.authenticator);
  return (
    <Box className="left-sidebar">
      <Paper className="profile-card">
        <div
          className="profile-cover"
          style={{
            backgroundImage: `url('${currentUser?.profileUrl ?? ""}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "6rem",
          }}
        ></div>
        <Avatar
          src={currentUser?.profileUrl ?? ""}
          className="profile-avatar"
        />

        <div className="profile-info">
          <Typography className="profile-name">
            {currentUser?.profileName}
          </Typography>

          <Typography className="profile-headline">
            {currentUser?.userTitle}
          </Typography>

          <Typography className="profile-location">
            {currentUser?.about}
          </Typography>
        </div>
      </Paper>

      <Paper className="premium-card">
        <Typography className="premium-text">
          Access exclusive tools & insights
        </Typography>

        <div className="premium-row">
          <div className="premium-icon"></div>
          <span>Try Premium for ₹0</span>
        </div>
      </Paper>

      <Paper className="analytics-card">
        <Typography className="analytics-title">View all analytics</Typography>

        <div className="analytics-row">
          <div>
            <Typography className="analytics-main">Connections</Typography>
            <Typography className="analytics-sub">Grow your network</Typography>
          </div>

          <span className="analytics-number">0</span>
        </div>
      </Paper>

      <Paper className="shortcuts-card">
        <div className="shortcut-row">
          <BookmarkIcon />
          <span>Saved items</span>
        </div>

        <div className="shortcut-row">
          <GroupsIcon />
          <span>Groups</span>
        </div>

        <div className="shortcut-row">
          <ArticleIcon />
          <span>Newsletters</span>
        </div>

        <div className="shortcut-row">
          <EventIcon />
          <span>Events</span>
        </div>
      </Paper>
    </Box>
  );
}
