import api from "@/lib/axios";
import { LoginResponse, User } from "@/types";

export async function register(
  email: string,
  username: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/register/", {
    email,
    username,
    password,
  });
  localStorage.setItem("access_token", data.tokens.access);
  localStorage.setItem("refresh_token", data.tokens.refresh);
  return data;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login/", {
    email,
    password,
  });
  localStorage.setItem("access_token", data.tokens.access);
  localStorage.setItem("refresh_token", data.tokens.refresh);
  return data;
}

export function logout(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/auth/me/");
  return data;
}

export async function getAllUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/auth/users/");
  return data;
}
