"use client";

import "./signup.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utility/firebase.config";
import { signupWithFirebaseToken } from "../../../redux/auth/authSlice";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Paasword must be of 6 characters atleast")
    .regex(
      /^\S+$/,
      "Password should not contain spaces or any whitespace characters.",
    ),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser, loading } = useAppSelector(
    (state) => state.authenticator,
  );
  console.log(currentUser, "CURRENT USER");
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (data: SignUpFormData) => {
    let firebaseUser;
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      firebaseUser = res.user;
      const idToken = await firebaseUser.getIdToken(true);
      dispatch(signupWithFirebaseToken({ idToken })).unwrap();
    } catch (error: any) {
      if (firebaseUser) {
        await firebaseUser.delete();
        console.warn("Firebase user rolled back");
      }

      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Email already registered",
        });
      } else {
        setError("email", {
          type: "manual",
          message: error.message || "Registration failed",
        });
      }
    }
  };
  const handleSocialAuth = async (provider: any) => {
    let firebaseUser;
    try {
      const res = await signInWithPopup(auth, provider);
      firebaseUser = res.user;
      const idToken = await firebaseUser.getIdToken(true);
      console.log("usr from google", res.user);
      dispatch(signupWithFirebaseToken({ idToken })).unwrap();
    } catch (error) {
      if (firebaseUser) {
        await firebaseUser.delete();
        console.warn("Firebase user rolled back");
      }
      console.error("Social Auth Error:", error);
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
            sx={{ marginBottom: "3rem" }}
          >
            Make the most of your professional life
          </Typography>

          <Box className="signup-card">
            <Stack spacing={2}>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email or phone number"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ marginTop: "14px" }}
                      {...field}
                      label="Password(6+ characters)"
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <span
                              className="show-btn"
                              onClick={() => setShowPassword((s) => !s)}
                            >
                              Show
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <FormControlLabel
                  sx={{ fontSize: "12px", marginTop: "6px" }}
                  control={<Checkbox defaultChecked />}
                  label="Keep me logged in"
                />

                <Typography sx={{ fontSize: "12px" }} className="terms-text">
                  By clicking Agree & Join or Continue, you agree to the
                  LinkedIn
                  <span className="blue-link"> User Agreement</span>,
                  <span className="blue-link"> Privacy Policy</span>, and
                  <span className="blue-link"> Cookie Policy</span>.
                </Typography>

                <Button
                  sx={{
                    marginTop: "20px",
                    backgroundColor: loading ? "grey" : "",
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="signup-btn"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Agree & Join"}
                </Button>
              </form>
              <Divider sx={{ marginTop: "20px" }}>or</Divider>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: "20px",
                  backgroundColor: loading ? "grey" : "",
                }}
                startIcon={<FcGoogle />}
                className="social-btn"
                onClick={() => handleSocialAuth(googleProvider)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue with Google"}
              </Button>
              <Typography textAlign={"center"} sx={{ marginTop: "20px" }}>
                Already on LinkedIn?{" "}
                <MuiLink
                  sx={{ textDecoration: "none", fontWeight: "600" }}
                  component={Link}
                  href="/auth/login"
                >
                  Sign in
                </MuiLink>
              </Typography>
            </Stack>
          </Box>

          <Typography className="help-text" sx={{ marginTop: "2rem" }}>
            Looking to create a page for a business?
            <span className="blue-link"> Get help</span>
          </Typography>
        </Stack>
      </Container>

      <Box className="footer">
        LinkedIn © 2026 · About · Accessibility · User Agreement · Privacy
        Policy · Cookie Policy · Copyright Policy · Brand Policy · Guest
        Controls · Community Guidelines · Language
      </Box>
    </Box>
  );
}
