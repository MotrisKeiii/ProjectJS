"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import { getPageById, updatePage } from "@/services/pageService";

export default function EditPagePage() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { getPageById(id).then(setPage).catch((err) => setError(err?.message || "Không tải được trang")); }, [id]);
  if (error) return <p className="text-red-600">{error}</p>;
  if (!page) return <p>Đang tải...</p>;
  return <PageForm title="Cập nhật trang" submitLabel="Lưu thay đổi" initialData={page} onSubmit={async (data) => { await updatePage(id, data); router.push("/admin/pages"); }} />;
}
