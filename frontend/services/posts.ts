import api from "@/lib/axios";
import { Post } from "@/types";

export async function getAllPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts/");
  return data;
}

export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}/`);
  return data;
}

export async function createPost(
  title: string,
  content: string
): Promise<Post> {
  const { data } = await api.post<Post>("/posts/", { title, content });
  return data;
}

export async function updatePost(
  id: number,
  title: string,
  content: string
): Promise<Post> {
  const { data } = await api.put<Post>(`/posts/${id}/`, { title, content });
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}/`);
}
