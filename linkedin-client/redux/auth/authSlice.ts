import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signupWithToken,
  signInWithToken,
  userProfile,
  findUser,
  getUsers,
  SocialSignIn,
  toggleBanUser,
} from "./authService";

export type User = {
  userid: string;
  email: string | null;
  displayName?: string | null;
  profileName?: string | null;
};

export type AuthState = {
  users: User[];
  total: number;
  page: number;
  limit: number;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  users: [],
  total: 0,
  page: 1,
  limit: 5,
  currentUser: null,
  loading: false,
  error: null,
};

export const signupWithFirebaseToken = createAsyncThunk(
  "auth/signupWithFirebase",
  async ({ idToken }: { idToken: string }, { rejectWithValue }) => {
    console.log(idToken);
    try {
      return await signupWithToken(idToken);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const signInWithFirebaseToken = createAsyncThunk(
  "auth/signInWithFirebase",
  async ({ idToken }: { idToken: string }, { rejectWithValue }) => {
    console.log(idToken);
    try {
      return await signInWithToken(idToken);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const userProfileCreate = createAsyncThunk(
  "user/profile",
  async (profileData: any, { rejectWithValue }) => {
    console.log(profileData, "dtaa in user profile create");
    try {
      return await userProfile(profileData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: any, { rejectWithValue }) => {
    console.log(credentials, "credentials in login");
    try {
      return await findUser(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const socialLogin = createAsyncThunk(
  "user/loginGoogle",

  async (credentials: any, { rejectWithValue }) => {
    console.log(credentials, "credentials in login google");
    try {
      return await SocialSignIn(credentials);
    } catch (error: any) {
      console.log(error, "hsfhg");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      return await getUsers({ page, limit });
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const toggleUserBan = createAsyncThunk(
  "user/toggleBan",
  async (userid: number, { rejectWithValue }) => {
    try {
      return await toggleBanUser(userid);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
    addCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signupWithFirebaseToken.pending, (state) => {
        console.log("register pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithFirebaseToken.fulfilled, (state, action) => {
        console.log("register fulfilled", action.payload);
        state.loading = false;
        state.currentUser = action.payload;
        console.log("currentUser after creatinguser", state.currentUser);
      })
      .addCase(signupWithFirebaseToken.rejected, (state, action) => {
        console.log("register rejected");
        console.log("register error", state.error);
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
      })
      .addCase(signInWithFirebaseToken.pending, (state) => {
        console.log("login pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithFirebaseToken.fulfilled, (state, action) => {
        console.log("login fulfilled", action.payload);
        state.loading = false;
        state.currentUser = action.payload;
        console.log("currentUser after login user", state.currentUser);
      })
      .addCase(signInWithFirebaseToken.rejected, (state, action) => {
        console.log("login rejected");
        console.log("login error", state.error);
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
      })
      .addCase(userProfileCreate.pending, (state) => {
        console.log("profile creation pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfileCreate.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentUser) {
          state.currentUser.profileName = action.payload.profileName;
        }
      })
      .addCase(userProfileCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
      })
      .addCase(socialLogin.pending, (state) => {
        console.log("login pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        console.log("login fulfilled", action.payload);
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        console.log("login rejected");
        console.log("login google error", state.error);
        state.loading = false;
        state.error = "User Banned Contact Admin";
        state.currentUser = null;
        console.log("login google error", state.error);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addCurrentUser, logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;
