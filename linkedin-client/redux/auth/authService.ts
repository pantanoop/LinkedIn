const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_BASE_URL = `http://localhost:5000`;

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
  const res = await fetch(`${API_BASE_URL}/user/createProfile`, {
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
    `${API_BASE_URL}/auth/users?page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const toggleBanUser = async (userid: number) => {
  console.log(userid);
  const response = await fetch(`${API_BASE_URL}/auth/ban/${userid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};
