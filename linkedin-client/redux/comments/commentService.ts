const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_POST;

export const fetchCommentsAPI = async (postId: string) => {
  const res = await fetch(`${API_BASE_URL}/comments/fetch/${postId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
};

export const addCommentAPI = async (
  postId: string,
  content: string,
  userId: string,
  userName: string,
  profileUrl: string,
  parentId?: string,
) => {
  const res = await fetch(`${API_BASE_URL}/posts/comments/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      parentId,
      userId,
      userName,
      profileUrl,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.json();
};
