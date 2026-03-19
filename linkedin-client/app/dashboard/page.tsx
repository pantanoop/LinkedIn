"use client";

import "./dashboard.css";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/navbar";
import LeftSidebar from "../../components/LeftSidebar/leftSidebar";
import Home from "../../components/Home/Home";
import RightSidebar from "../../components/RightSidebar/rightSidebar";

export default function Dashboard() {
  return (
    <Box className="feed-page">
      <Navbar />

      <Box className="feed-body">
        <LeftSidebar />

        <Home />

        <RightSidebar />
      </Box>
    </Box>
  );
}
