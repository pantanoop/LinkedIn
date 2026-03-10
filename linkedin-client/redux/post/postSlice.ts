import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addUserPost, getUsers } from "./postService";

export type Post = {
  postId: string;
  userid: string;
  description: string;
  imageUrls: string[];
  postType: string;
};

export type PostState = {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
};

const initialState: PostState = {
  posts: [],
  total: 0,
  page: 1,
  limit: 5,
  loading: false,
  error: null,
};

export const addPost = createAsyncThunk(
  "user/posts/add",
  async (data: any, { rejectWithValue }) => {
    console.log(data, "dtaa in user profile create");
    try {
      return await addUserPost(data);
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

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addPost.pending, (state) => {
        console.log("profile creation pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "in post slice fulfilled");
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
