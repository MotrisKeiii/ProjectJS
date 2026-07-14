"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { createPost } from "@/services/postService";

export default function CreatePostPage() {
  const router = useRouter();
  return <PostForm title="Thêm bài viết" submitLabel="Tạo bài viết" onSubmit={async (data) => { await createPost(data); router.push("/admin/posts"); }} />;
}
