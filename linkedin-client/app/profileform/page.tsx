"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { completeProfileUser } from "../../redux/auth/authSlice";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  headline: z.string().optional(),
  about: z.string().max(300, "About must be under 300 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UpdateProfileProps {
  onClose?: () => void;
}

export default function CompleteProfilePage({ onClose }: UpdateProfileProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState(false);
  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      headline: "",
      about: "",
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profilePicture" | "coverPicture",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "profilePicture") {
      setProfileFile(file);
      setProfilePreview(previewUrl);
    } else {
      setCoverFile(file);
      setCoverPreview(previewUrl);
    }
    e.target.value = "";
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();

      formData.append("currentUserId", currentUser.userid);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("headline", data.headline || "");
      formData.append("about", data.about || "");
      if (profileFile) {
        formData.append("profilePicture", profileFile);
      }
      if (coverFile) {
        formData.append("coverPicture", coverFile);
      }
      console.log("🚀 FRONTEND SUBMIT:", Object.fromEntries(formData));
      await dispatch(completeProfileUser(formData)).unwrap();
      setSnackbar(true);
      if (onClose) onClose();
    } catch (error) {
      console.error("❌ SUBMIT ERROR:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Complete Your Profile
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1">Cover Picture</Typography>
              <Box
                sx={{
                  height: 150,
                  backgroundColor: "#f3f2ef",
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}

                <Button
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                  variant="contained"
                  size="small"
                >
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageChange(e, "coverPicture")}
                  />
                </Button>
              </Box>
            </Box>

            <Box textAlign="center">
              <Avatar
                src={profilePreview || ""}
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <Button
                component="label"
                startIcon={<PhotoCamera />}
                variant="outlined"
              >
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, "profilePicture")}
                />
              </Button>
            </Box>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />

            <Controller
              name="headline"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Headline" fullWidth />
              )}
            />

            <Controller
              name="about"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="About"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.about}
                  helperText={errors.about?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" size="large">
              Save & Continue
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
