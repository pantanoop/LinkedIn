"use client";

import "./home.css";
import { useState } from "react";

import { Box, Paper, Avatar, Button, Typography, Stack } from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import AddIcon from "@mui/icons-material/Add";
import PostModal from "../PostModal/postModal";
import PostCard from "../PostCard/PostCard";

export default function Home() {
  const [openPostModal, setOpenPostModal] = useState(false);
  return (
    <Box>
      <Paper elevation={1} className="start-post-card">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src="/profile.jpg" />
          <PostModal
            open={openPostModal}
            onClose={() => setOpenPostModal(false)}
          />
          <Button
            fullWidth
            variant="outlined"
            className="start-post-input"
            onClick={() => setOpenPostModal(true)}
          >
            Start a post
          </Button>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-around"
          className="start-post-actions"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="post-action"
          >
            <VideocamIcon className="video-icon" />
            <Typography variant="body2">Video</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="post-action"
          >
            <ImageIcon className="photo-icon" />
            <Typography variant="body2">Photo</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="post-action"
          >
            <ArticleIcon className="article-icon" />
            <Typography variant="body2">Write article</Typography>
          </Stack>
        </Stack>
      </Paper>

      <Paper elevation={1} className="recommended-card">
        <Typography className="recommended-title">
          Recommended for you
        </Typography>

        <Stack direction="row" spacing={1.5} className="recommended-row">
          <Avatar src="/profile.jpg" />

          <Box className="recommended-info">
            <Typography className="recommended-name">Amina Habib</Typography>
            <Typography className="recommended-headline">
              Entrepreneur | Women Impact Hub
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="follow-btn"
          >
            Follow
          </Button>
        </Stack>

        <Stack direction="row" spacing={1.5} className="recommended-row">
          <Avatar src="/profile.jpg" />

          <Box className="recommended-info">
            <Typography className="recommended-name">
              Valentina Sander
            </Typography>
            <Typography className="recommended-headline">
              Lic. en Psicología | Recruiter
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="follow-btn"
          >
            Follow
          </Button>
        </Stack>

        <Stack direction="row" spacing={1.5} className="recommended-row">
          <Avatar src="/profile.jpg" />

          <Box className="recommended-info">
            <Typography className="recommended-name">
              Antonela Correa
            </Typography>
            <Typography className="recommended-headline">
              HR at Bagley Argentina
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="follow-btn"
          >
            Follow
          </Button>
        </Stack>

        <Typography className="show-more">Show more →</Typography>
      </Paper>
      <PostCard
        author="Jane Doe"
        title="Software Engineer at Tech Corp"
        time="2h"
        content="Excited to share that I've just completed a new project using Next.js! The journey has been amazing and I learned a lot about server components and layouts."
      />
      <PostCard
        author="Jane Doe"
        title="Software Engineer at Tech Corp"
        time="2h"
        content="Excited to share that I've just completed a new project using Next.js! The journey has been amazing and I learned a lot about server components and layouts."
      />
      <Box id="feed-posts-container" />
    </Box>
  );
}
