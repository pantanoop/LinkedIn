import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCommentsAPI, addCommentAPI } from "./commentService";
import { buildCommentTree } from "../../app/utility/build_comment_tree";
export type Comment = {
  commentId: string;
  postId: string;
  userName: string;
  content: string;
  parentId?: string;
  replies?: Comment[];
};

type CommentState = {
  commentsByPost: {
    [postId: string]: Comment[];
  };
  loading: boolean;
};

const initialState: CommentState = {
  commentsByPost: {},
  loading: false,
};

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (postId: string) => {
    const data = await fetchCommentsAPI(postId);
    return { postId, comments: data };
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async ({
    postId,
    content,
    parentId,
    userId,
    userName,
    profileUrl,
  }: {
    postId: string;
    content: string;

    userId: string;
    userName: string;
    profileUrl: string;
    parentId?: string;
  }) => {
    const data = await addCommentAPI(
      postId,
      content,
      userId,
      userName,
      profileUrl,
      parentId,
    );
    return { postId, comment: data };
  },
);
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;

        state.commentsByPost[action.payload.postId] = buildCommentTree(
          action.payload.comments,
        );
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;

        if (!state.commentsByPost[postId]) {
          state.commentsByPost[postId] = [];
        }

        if (!comment.parentId) {
          state.commentsByPost[postId].push({ ...comment, replies: [] });
        } else {
          const insertReply = (comments: Comment[]) => {
            for (let c of comments) {
              if (c.commentId === comment.parentId) {
                if (!c.replies) c.replies = [];
                c.replies.push({ ...comment, replies: [] });
                return true;
              }

              if (c.replies?.length) {
                if (insertReply(c.replies)) return true;
              }
            }
            return false;
          };

          insertReply(state.commentsByPost[postId]);
        }
      });

    //   .addCase(addComment.fulfilled, (state, action) => {
    //     const { postId, comment } = action.payload;

    //     if (!state.commentsByPost[postId]) {
    //       state.commentsByPost[postId] = [];
    //     }

    //     if (!comment.parentId) {
    //       state.commentsByPost[postId].push(comment);
    //     } else {
    //       const insertReply = (comments: any[]) => {
    //         for (let c of comments) {
    //           if (c.commentId === comment.parentId) {
    //             if (!c.replies) c.replies = [];
    //             c.replies.push(comment);
    //             return;
    //           }
    //           if (c.replies) insertReply(c.replies);
    //         }
    //       };

    //       insertReply(state.commentsByPost[postId]);
    //     }
    //   });
  },
});

export default commentSlice.reducer;
