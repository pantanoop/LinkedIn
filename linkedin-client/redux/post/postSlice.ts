import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addUserPost,
  getPosts,
  toggleLikePost,
  repostPost,
} from "./postService";

export type Post = {
  postId: string;
  userid: string;
  userName: string;
  userTitle: string;
  profileUrl: string;
  description: string;
  mediaUrls: string[];
  postType: string;
  likeCount: number;
  likedByUser: boolean;
  postedOn: string;
  type: "post" | "repost";
  repostUser?: string;
  repostUserId?: string;
  repostedOn?: string;
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
  async (data: FormData, { rejectWithValue }) => {
    try {
      return await addUserPost(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchPosts = createAsyncThunk(
  "auth/fetchPosts",
  async (_, { rejectWithValue }) => {
    console.log("hitted service fetch users");
    try {
      return await getPosts();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (
    { postId, userId }: { postId: string; userId: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await toggleLikePost(postId, userId);
      return { postId, liked: res.liked };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const repost = createAsyncThunk(
  "posts/repost",
  async (
    { postId, userName }: { postId: string; userName: string },
    { rejectWithValue },
  ) => {
    try {
      return await repostPost(postId, userName);
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
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, liked } = action.payload;

        state.posts.forEach((post) => {
          if (post.postId === postId) {
            post.likedByUser = liked;

            if (liked) {
              post.likeCount += 1;
            } else {
              post.likeCount = Math.max(post.likeCount - 1, 0);
            }
          }
        });
      })
      .addCase(repost.fulfilled, (state, action) => {
        const newPost = action.payload;
        state.posts.unshift(newPost);
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
