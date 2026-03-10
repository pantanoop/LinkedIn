"use client";

import "./login.css";
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
  InputAdornment,
  Link,
} from "@mui/material";

import { Link as MuiLink } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import AppleIcon from "@mui/icons-material/Apple";
import { auth, googleProvider } from "../../utility/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signInWithFirebaseToken } from "../../../redux/auth/authSlice";
const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^\S+$/,
      "Password should not contain spaces or any whitespace characters.",
    ),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser, loading } = useAppSelector(
    (state) => state.authenticator,
  );

  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentUser, router]);
  console.log(currentUser, "CURRENT USER");
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
    } catch (error: any) {
      let message = "Login Failed";
      if (error.code === "auth/user-not-found") {
        message = "Email not registered";
        setError("email", { type: "manual", message });
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password";
        setError("password", { type: "manual", message });
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        message = "Account exists with different credential";
        setError("email", { type: "manual", message });
      } else if (error.code === "auth/invalid-credential") {
        message = "Invalid credentials";
        setError("email", { type: "manual", message });
      }
    }
  };
  const handleSocialAuth = async (provider: any) => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = await res.user.getIdToken(true);
      console.log("usr from google", res.user);
      dispatch(signInWithFirebaseToken({ idToken })).unwrap();
    } catch (error) {
      if (auth.currentUser) {
        await auth.signOut();
        console.log("Signed out due to backend failure");
      }
      console.error("Social Auth Error:", error);
    }
  };
  return (
    <Box className="signin-page-root">
      <Box className="top-logo">
        <Typography variant="h4" className="signin-logo">
          Linked
          <span className="signin-logo-in">in</span>
        </Typography>
      </Box>
      <Container maxWidth="sm" sx={{ width: "30rem" }}>
        <Stack alignItems="center">
          <Box className="signin-card">
            <Stack spacing={2}>
              <Typography variant="h4" className="signin-title">
                Sign in
              </Typography>

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
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: "20px",
                  backgroundColor: loading ? "grey" : "",
                }}
                startIcon={<AppleIcon sx={{ color: "black" }} />}
                className="social-btn"
                // onClick={() => handleSocialAuth(googleProvider)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in with Apple"}
              </Button>

              <Typography sx={{ fontSize: "12px" }} className="terms-text">
                By clicking Continue, you agree to LinkedIn’s
                <span className="blue-link"> User Agreement</span>,
                <span className="blue-link"> Privacy Policy</span>, and
                <span className="blue-link"> Cookie Policy</span>.
              </Typography>

              <Divider>or</Divider>
              <form onSubmit={handleSubmit(handleLogin)}>
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
                      label="Password"
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
                <Button
                  sx={{
                    marginTop: "20px",
                    backgroundColor: loading ? "grey" : "",
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="signin-btn"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign in"}
                </Button>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Typography textAlign={"center"} sx={{ marginTop: "20px" }}>
        New to LinkedIn?{" "}
        <MuiLink
          sx={{ textDecoration: "none", fontWeight: "600" }}
          component={Link}
          href="/auth/signup"
        >
          Join Now
        </MuiLink>
      </Typography>
      <Box className="footer">
        LinkedIn © 2026 · About · Accessibility · User Agreement · Privacy
        Policy · Cookie Policy · Copyright Policy · Brand Policy · Guest
        Controls · Community Guidelines · Language
      </Box>
    </Box>
  );
}
