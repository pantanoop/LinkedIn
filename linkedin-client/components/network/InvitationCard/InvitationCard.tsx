"use client";

import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  acceptConnectionUser,
  toggleConnectionUser,
  fetchUsers,
  fetchInvitations,
  fetchConnectionStatus,
} from "@/redux/auth/authSlice";

export default function InvitationCard({ invitations }: any) {
  const dispatch = useAppDispatch();

  const { currentUser, limit } = useAppSelector(
    (state: any) => state.authenticator,
  );

  const isEmpty = !invitations || invitations.length === 0;

  const handleIgnore = async (requesterId: number) => {
    if (!currentUser?.id) return;

    await dispatch(
      toggleConnectionUser({
        currentUserId: currentUser.id,
        targetUserId: requesterId,
      }),
    );

    await dispatch(fetchInvitations(currentUser.id));
    await dispatch(fetchConnectionStatus(currentUser.id));
  };

  const handleAccept = async (connectionId: number) => {
    if (!currentUser?.id) return;

    await dispatch(
      acceptConnectionUser({
        connectionId,
        currentUserId: currentUser.id,
      }),
    );

    await dispatch(fetchUsers({ page: 1, limit }));
    await dispatch(fetchInvitations(currentUser.id));
    await dispatch(fetchConnectionStatus(currentUser.id));
  };

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

              <Typography sx={{ fontSize: 13, color: "#666" }}>
                {inv.userTitle || "No headline"}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() => handleIgnore(inv.requesterId)}
            >
              Ignore
            </Button>

            <Button
              variant="contained"
              onClick={() => handleAccept(inv.connectionId)}
            >
              Accept
            </Button>
          </Box>
        ))
      )}
    </Paper>
  );
}
