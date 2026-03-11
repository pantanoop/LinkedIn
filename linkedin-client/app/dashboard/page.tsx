"use client";

import "./dashboard.css";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/navbar";
import LeftSidebar from "../../components/LeftSidebar/leftSidebar";
import Home from "../../components/Home/home";
import RightSidebar from "../../components/RightSidebar/rightSidebar";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { currentUser } = useAppSelector((state: any) => state.authenticator);
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.replace("/auth/login");
    }
  });
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
