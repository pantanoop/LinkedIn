import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signupWithToken,
  signInWithToken,
  userProfile,
  findUser,
  getUsers,
  SocialSignIn,
  toggleFollow,
  toggleConnection,
  acceptConnection,
  getInvitations,
} from "./authService";

export type User = {
  id: number;
  userid: string;
  email: string | null;
  displayName?: string | null;
  profileName?: string | null;
  userTitle?: string | null;
  about?: string | null;
  profileUrl?: string | null;
  coverUrl?: string | null;
  followersCount?: number;
  followingCount?: number;
  connectionsCount?: number;
  createdAt?: string;
};

export type AuthState = {
  users: User[];
  invitations: [];
  total: number;
  page: number;
  limit: number;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  followingMap: Record<number, boolean>;
  connectionMap: Record<
    number,
    { status: "NONE" | "PENDING" | "ACCEPTED"; connectionId?: number }
  >;
};

const initialState: AuthState = {
  users: [],
  invitations: [],
  total: 0,
  page: 1,
  limit: 5,
  currentUser: null,
  loading: false,
  error: null,
  followingMap: {},
  connectionMap: {},
};
export const fetchInvitations = createAsyncThunk(
  "user/fetchInvitations",
  async (currentUserId: number, { rejectWithValue }) => {
    try {
      console.log("fetch ini thunk hit", currentUserId);
      return await getInvitations(currentUserId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const toggleConnectionUser = createAsyncThunk(
  "user/toggleConnection",
  async (data: any, { rejectWithValue }) => {
    try {
      return await toggleConnection(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const acceptConnectionUser = createAsyncThunk(
  "user/acceptConnection",
  async (data: any, { rejectWithValue }) => {
    try {
      return await acceptConnection(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
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

export const toggleFollowUser = createAsyncThunk(
  "user/toggleFollow",
  async (data: any, { rejectWithValue }) => {
    try {
      return await toggleFollow(data);
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
    clearUsers: (state) => {
      state.users = [];
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
          state.currentUser = {
            ...state.currentUser,
            ...action.payload,
          };
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
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        const { followingId, isFollowing } = action.payload;

        state.followingMap[followingId] = isFollowing;

        state.users = state.users.map((user) => {
          if (user.id === followingId) {
            return {
              ...user,
              followersCount:
                (user.followersCount || 0) + (isFollowing ? 1 : -1),
            };
          }
          return user;
        });
        if (state.currentUser) {
          state.currentUser.followingCount =
            (state.currentUser.followingCount || 0) + (isFollowing ? 1 : -1);
        }
      })
      .addCase(toggleConnectionUser.fulfilled, (state, action) => {
        const { targetUserId, status, connectionId } = action.payload;
        console.log("toggle conn slice", action.payload);

        state.connectionMap[targetUserId] = {
          status,
          connectionId,
        };

        if (status === "NONE") {
          state.users = state.users.map((user) => {
            if (user.id === targetUserId) {
              return {
                ...user,
                connectionsCount: Math.max((user.connectionsCount || 1) - 1, 0),
              };
            }
            return user;
          });

          if (state.currentUser) {
            state.currentUser.connectionsCount = Math.max(
              (state.currentUser.connectionsCount || 1) - 1,
              0,
            );
          }
        }
      })
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        console.log("fetch invi slice", action.payload);
        state.invitations = action.payload;
      });
  },
});

export const { addCurrentUser, logout, clearUsers } = authenticateSlice.actions;
export default authenticateSlice.reducer;
