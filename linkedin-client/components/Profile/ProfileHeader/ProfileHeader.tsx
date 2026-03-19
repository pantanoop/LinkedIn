"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { Button, Avatar, Typography, Box } from "@mui/material";

interface ProfileHeaderProps {
  onAddSection: () => void;
}

export default function ProfileHeader({ onAddSection }: ProfileHeaderProps) {
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  return (
    <div className="profile-header">
      <div
        className="cover"
        style={{
          backgroundImage: currentUser?.coverUrl
            ? `url(${currentUser.coverUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="profile-info">
        <Avatar
          src={currentUser?.profileUrl || ""}
          sx={{
            width: 120,
            height: 120,
            border: "4px solid white",
            marginTop: "-60px",
            backgroundColor: "#1976d2",
            fontSize: "40px",
          }}
        >
          {!currentUser?.profileUrl && currentUser?.profileName
            ? currentUser.profileName.charAt(0).toUpperCase()
            : ""}
        </Avatar>

        <Typography variant="h5" fontWeight={600}>
          {currentUser?.profileName || "Your Name"}
        </Typography>

        {currentUser?.userTitle && (
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5 }}>
            {currentUser.userTitle}
          </Typography>
        )}

        {currentUser?.about && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1,
              maxWidth: 600,
            }}
          >
            {currentUser.about}
          </Typography>
        )}
        <Box className="profile-actions" sx={{ mt: 2 }}>
          <Button variant="contained">Open to</Button>

          <Button variant="outlined" onClick={onAddSection}>
            Add profile section
          </Button>
        </Box>
      </div>
    </div>
  );
}
