const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_POST;

export const addUserPost = async (data: FormData) => {
  console.log("formdata in service", data);
  const res = await fetch(`${API_BASE_URL}/posts/add`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  return res.json();
};

export const getPosts = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/fetch`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const toggleLikePost = async (postId: string, userId: string) => {
  const res = await fetch(`${API_BASE_URL}/posts/like/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle like");
  }

  return res.json();
};

export const repostPost = async (postId: string, userName: string) => {
  const res = await fetch(`${API_BASE_URL}/posts/repost/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to repost");
  }

  return res.json();
};
