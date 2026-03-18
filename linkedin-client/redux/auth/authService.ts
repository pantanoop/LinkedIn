const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL_USER;

export const findUser = async (credentials: any) => {
  console.log(credentials);
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
};

export const signupWithToken = async (idToken: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  return res.json();
};

export const signInWithToken = async (idToken: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ idToken }),
  });

  return res.json();
};

export const userProfile = async (profileData: any) => {
  const res = await fetch(`${API_URL}/user/createProfile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  return res.json();
};

export const SocialSignIn = async (credentials: any) => {
  console.log(credentials, "api login");
  const response = await fetch(`${API_BASE_URL}/auth/login/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
};

export const getUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await fetch(
    `${API_URL}/users/fetch?page=${page}&limit=${limit}`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const toggleFollow = async (data: any) => {
  const res = await fetch(`${API_URL}/users/follow`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle follow");
  }

  return res.json();
};

export const toggleConnection = async (data: any) => {
  const res = await fetch(`${API_URL}/connections/toggle`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle connection");
  }

  return res.json();
};

export const acceptConnection = async (data: any) => {
  const res = await fetch(`${API_URL}/connections/accept`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to accept connection");
  }

  return res.json();
};

export const getInvitations = async (currentUserId: number) => {
  console.log(currentUserId, "in service get invi");
  const res = await fetch(`${API_URL}/connections/invitations`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentUserId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invitations");
  }

  return res.json();
};

export const getConnectionStatus = async (currentUserId: number) => {
  console.log(currentUserId, "in service get invi");
  const res = await fetch(`${API_URL}/connections/status`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentUserId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invitations");
  }

  return res.json();
};

export const completeProfile = async (formData: FormData) => {
  const res = await fetch(`${API_URL}/users/add/profile`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to complete profile");
  }

  return res.json();
};
