"use client";

import { useRouter } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import { createPage } from "@/services/pageService";

export default function CreatePagePage() {
  const router = useRouter();
  return <PageForm title="Thêm trang" submitLabel="Tạo trang" onSubmit={async (data) => { await createPage(data); router.push("/admin/pages"); }} />;
}
