"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getTopics } from "@/services/topicService";

const emptyPost = { title: "", content: "", topic_id: "" };

export default function PostForm({ initialData = emptyPost, onSubmit, title, submitLabel }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ ...emptyPost, ...initialData });
  const [topics, setTopics] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTopics({ trash: 0, status: 1 })
      .then((data) => setTopics(Array.isArray(data) ? data : data?.data || []))
      .catch((error) => setErrors({ message: error?.message || "Không tải được chủ đề" }));
  }, []);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    const postTitle = formData.title.trim();
    const content = formData.content.trim();
    if (!postTitle) nextErrors.title = "Vui lòng nhập tiêu đề";
    if (!content) nextErrors.content = "Vui lòng nhập nội dung";
    if (!Number(formData.topic_id)) nextErrors.topic_id = "Vui lòng chọn chủ đề";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await onSubmit({ title: postTitle, content, topic_id: Number(formData.topic_id), author_id: initialData.author_id || user?.user_id });
    } catch (error) {
      setErrors({ message: error?.data?.error || error?.message || "Không thể lưu bài viết" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-5 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between gap-4"><h1 className="text-2xl font-bold text-slate-800">{title}</h1><Link href="/admin/posts" className="text-sm font-semibold text-blue-600">Quay lại</Link></div>
      {errors.message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.message}</p>}
      <div><label className="mb-1 block text-sm font-medium">Tiêu đề</label>{errors.title && <p className="mb-1 text-sm text-red-500">{errors.title}</p>}<input name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" /></div>
      <div><label className="mb-1 block text-sm font-medium">Chủ đề</label>{errors.topic_id && <p className="mb-1 text-sm text-red-500">{errors.topic_id}</p>}<select name="topic_id" value={formData.topic_id} onChange={handleChange} className="w-full rounded-lg border px-3 py-2"><option value="">Chọn chủ đề</option>{topics.map((topic) => <option key={topic.topic_id} value={topic.topic_id}>{topic.name}</option>)}</select></div>
      <div><label className="mb-1 block text-sm font-medium">Nội dung</label>{errors.content && <p className="mb-1 text-sm text-red-500">{errors.content}</p>}<textarea name="content" rows={14} value={formData.content} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" /></div>
      <button disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white disabled:opacity-50">{loading ? "Đang xử lý..." : submitLabel}</button>
    </form>
  );
}
