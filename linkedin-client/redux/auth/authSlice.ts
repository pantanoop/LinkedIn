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
  getConnectionStatus,
  completeProfile,
  fetchUserProfile,
  logoutUser,
  addEducation,
  getEducationByUser,
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

export type Invitation = {
  connectionId: number;
  requesterId: number;
  profileName?: string;
  userTitle?: string;
  profileUrl?: string;
};

export type AuthState = {
  users: User[];
  invitations: Invitation[];
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
      return await getInvitations(currentUserId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchConnectionStatus = createAsyncThunk(
  "user/fetchConnectionStatus",
  async (currentUserId: number, { rejectWithValue }) => {
    try {
      return await getConnectionStatus(currentUserId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (currentUserId: string, { rejectWithValue }) => {
    try {
      return await fetchUserProfile(currentUserId);
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

export const completeProfileUser = createAsyncThunk(
  "user/completeProfile",
  async (profileData: any, { rejectWithValue }) => {
    try {
      return await completeProfile(profileData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signupWithFirebaseToken = createAsyncThunk(
  "auth/signupWithFirebase",
  async ({ idToken }: { idToken: string }, { rejectWithValue }) => {
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
    try {
      return await SocialSignIn(credentials);
    } catch (error: any) {
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
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutUser();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addUserEducation = createAsyncThunk(
  "education/add",
  async (data: any, { rejectWithValue }) => {
    try {
      return await addEducation(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchEducation = createAsyncThunk(
  "education/fetch",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await getEducationByUser(userId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithFirebaseToken.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signupWithFirebaseToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
      })
      .addCase(signInWithFirebaseToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithFirebaseToken.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signInWithFirebaseToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentUser = null;
      })
      .addCase(userProfileCreate.pending, (state) => {
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
        state.loading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = "User Banned Contact Admin";
        state.currentUser = null;
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
        const {
          targetUserId,
          status,
          connectionId,
          requesterId,
          requesterConnectionsCount,
          receiverConnectionsCount,
        } = action.payload;

        if (status === "NONE") {
          delete state.connectionMap[targetUserId];

          if (state.currentUser) {
            if (state.currentUser.id === requesterId) {
              state.currentUser.connectionsCount = requesterConnectionsCount;
            } else {
              state.currentUser.connectionsCount = receiverConnectionsCount;
            }
          }
          const otherUser = state.users.find((u) => u.id === targetUserId);
          if (otherUser) {
            if (otherUser.id === requesterId) {
              otherUser.connectionsCount = requesterConnectionsCount;
            } else {
              otherUser.connectionsCount = receiverConnectionsCount;
            }
          }
        } else {
          state.connectionMap[targetUserId] = {
            status,
            connectionId,
          };
        }
      })
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload;
      })
      .addCase(acceptConnectionUser.fulfilled, (state, action) => {
        const {
          requesterId,
          connectionId,
          requesterConnectionsCount,
          receiverConnectionsCount,
        } = action.payload;

        state.connectionMap[requesterId] = {
          status: "ACCEPTED",
          connectionId,
        };

        state.invitations = state.invitations.filter(
          (inv) => inv.connectionId !== connectionId,
        );

        const requester = state.users.find((u) => u.id === requesterId);
        if (requester) {
          requester.connectionsCount = requesterConnectionsCount;
        }

        if (state.currentUser) {
          if (state.currentUser.id === requesterId) {
            state.currentUser.connectionsCount = requesterConnectionsCount;
          } else {
            state.currentUser.connectionsCount = receiverConnectionsCount;
          }
        }
      })
      .addCase(fetchConnectionStatus.fulfilled, (state, action) => {
        state.connectionMap = {};
        action.payload.forEach((conn: any) => {
          state.connectionMap[conn.userId] = {
            status: conn.status,
            connectionId: conn.connectionId,
          };
        });
      })
      .addCase(completeProfileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProfileUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload.user;
        if (state.currentUser) {
          state.currentUser = {
            ...state.currentUser,
            ...updatedUser,
          };
        }
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
        );
      })
      .addCase(completeProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload || Object.keys(action.payload).length === 0) {
          state.currentUser = state.currentUser;
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const { addCurrentUser, clearUsers } = authenticateSlice.actions;
export default authenticateSlice.reducer;
