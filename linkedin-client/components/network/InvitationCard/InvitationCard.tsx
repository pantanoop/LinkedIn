"use client";

import { useEffect, useState } from "react";
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  acceptConnectionUser,
  toggleConnectionUser,
  fetchUsers,
  fetchInvitations,
  fetchConnectionStatus,
  getUserProfile,
} from "@/redux/auth/authSlice";

export default function InvitationCard({ invitations }: any) {
  const dispatch = useAppDispatch();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { currentUser, limit, users } = useAppSelector(
    (state: any) => state.authenticator,
  );

  const isEmpty = !invitations || invitations.length === 0;

  const handleIgnore = async (requesterId: number) => {
    if (!currentUser?.id) return;

    try {
      setLoadingId(requesterId);

      await dispatch(
        toggleConnectionUser({
          currentUserId: currentUser.id,
          targetUserId: requesterId,
        }),
      ).unwrap();
    } catch (err) {
      console.error("Ignore failed:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleAccept = async (connectionId: number) => {
    if (!currentUser?.id) return;

    await dispatch(
      acceptConnectionUser({
        connectionId,
        currentUserId: currentUser.id,
      }),
    );
    await dispatch(fetchInvitations(currentUser.id));
    await dispatch(fetchConnectionStatus(currentUser.id));
    await dispatch(fetchUsers({ page: 1, limit }));
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
        invitations.map((inv: any) => {
          const isLoading = loadingId === inv.connectionId;

          return (
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
                disabled={isLoading}
                onClick={() => handleIgnore(inv.requesterId)}
              >
                {isLoading ? "..." : "Ignore"}
              </Button>

              <Button
                variant="contained"
                disabled={isLoading}
                onClick={() => handleAccept(inv.connectionId)}
              >
                {isLoading ? "..." : "Accept"}
              </Button>
            </Box>
          );
        })
      )}
    </Paper>
  );
}
