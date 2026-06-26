export interface User {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  tokens: AuthTokens;
  user: User;
}
