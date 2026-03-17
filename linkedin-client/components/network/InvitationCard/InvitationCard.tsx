"use client";

import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  acceptConnectionUser,
  toggleConnectionUser,
} from "@/redux/auth/authSlice";

export default function InvitationCard({ invitations }: any) {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  const isEmpty = !invitations || invitations.length === 0;

  return (
    <Paper className="suggestion-section">
      <div className="suggestion-header">
        <h3>Invitations</h3>
      </div>

      {isEmpty ? (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: "#666", fontSize: 14 }}>
            No pending invitations
          </Typography>
        </Box>
      ) : (
        invitations.map((inv: any) => (
          <Box
            key={inv.connectionId}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Avatar src={inv.profileUrl || "/default-avatar.png"} />

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {inv.profileName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#666",
                }}
              >
                {inv.userTitle || "No headline"}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() =>
                dispatch(
                  toggleConnectionUser({
                    currentUserId: currentUser.id,
                    targetUserId: inv.requesterId,
                  }),
                )
              }
            >
              Ignore
            </Button>

            <Button
              variant="contained"
              onClick={() =>
                dispatch(
                  acceptConnectionUser({
                    connectionId: inv.connectionId,
                    currentUserId: currentUser.id,
                  }),
                )
              }
            >
              Accept
            </Button>
          </Box>
        ))
      )}
    </Paper>
  );
}
