"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getPostById, updatePost } from "@/services/postService";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getPostById(id).then(setPost).catch((err) => setError(err?.message || "Không tải được bài viết")); }, [id]);
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Đang tải...</p>;
  return <PostForm title="Cập nhật bài viết" submitLabel="Lưu thay đổi" initialData={post} onSubmit={async (data) => { await updatePost(id, data); router.push("/admin/posts"); }} />;
}
