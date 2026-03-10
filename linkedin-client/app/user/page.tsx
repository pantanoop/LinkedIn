"use client";

import "./profile.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { userProfileCreate } from "../../redux/auth/authSlice";

const UserSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().optional(),
});

type UserFormData = z.infer<typeof UserSchema>;

export default function CompleteProfile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentUser, loading } = useAppSelector(
    (state) => state.authenticator,
  );

  useEffect(() => {
    if (currentUser?.profileName) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const handleUserData = async (data: UserFormData) => {
    const profileName = `${data.first_name} ${data.last_name}`;

    try {
      await dispatch(userProfileCreate(profileName)).unwrap();
    } catch (error: any) {
      console.error("Profile creation failed:", error);
    }
  };

  return (
    <Box className="signup-page-root">
      <Box className="top-logo">
        <Typography variant="h4" className="signup-logo">
          Linked
          <span className="signup-logo-in">in</span>
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Stack alignItems="center">
          <Typography
            className="main-title"
            variant="h4"
            sx={{ marginTop: "24px", marginBottom: "25px" }}
          >
            Make the most of your professional life
          </Typography>

          <Box className="signup-card">
            <Stack spacing={2}>
              <form onSubmit={handleSubmit(handleUserData)}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ marginTop: 2 }}
                      label="Last Name"
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                      fullWidth
                    />
                  )}
                />

                <Button
                  sx={{ marginTop: 3 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Continue"}
                </Button>
              </form>
            </Stack>
          </Box>
        </Stack>
        <Divider className="footerDivider" />
        <Box className="footer">
          LinkedIn © 2026 · About · Accessibility · User Agreement · Privacy
          Policy · Cookie Policy · Copyright Policy · Brand Policy · Guest
          Controls · Community Guidelines · Language
        </Box>
      </Container>
    </Box>
  );
}
