const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_POST;
// const API_BASE_URL = `http://localhost:6000`;

export const addUserPost = async (data: FormData) => {
  const res = await fetch(`${API_BASE_URL}/posts/add`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  return res.json();
};

export const getPosts = async () => {
  console.log("servie hittes");
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
