"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { deletePost, getPosts } from "@/services/postService";

const columns = [
  { key: "post_id", label: "ID", width: "w-20" },
  { key: "title", label: "Tiêu đề" },
  { key: "content", label: "Nội dung" },
];

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    try { setLoading(true); setError(""); const data = await getPosts({ trash: 0 }); setPosts(Array.isArray(data) ? data : data?.data || []); }
    catch (err) { setError(err?.message || "Không tải được bài viết"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (post) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài "${post.title}" không?`)) return;
    try { await deletePost(post.post_id); setMessage("Xóa bài viết thành công"); await fetchPosts(); }
    catch (err) { setError(err?.message || "Xóa bài viết thất bại"); }
  };

  return <div><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">Quản lý bài viết</h1><Link href="/admin/posts/create" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Thêm bài viết</Link></div>{message && <p className="mb-4 text-green-600">{message}</p>}{error && <p className="mb-4 text-red-600">{error}</p>}{loading ? <p>Đang tải...</p> : <AdminTable columns={columns} data={posts} onEdit={(post) => router.push(`/admin/posts/${post.post_id}`)} onDelete={handleDelete} />}</div>;
}
