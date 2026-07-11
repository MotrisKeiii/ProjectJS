"use client";

import { useState } from "react";
import { uploadSingleFile } from "@/services/uploadService";

export default function UploadSingleFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setImageUrl("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Vui lòng chọn file");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await uploadSingleFile(file);
      setImageUrl(res.file);
      const fileUrl = res.file; 
      const fileName = fileUrl.split("/").pop();
      onUploadSuccess(fileName);
    } catch (error) {
      console.error(error);
      setError(error.message || "Upload thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold">Upload ảnh</h2>

      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <img
          src={preview}
          alt="Ảnh xem trước"
          className="h-48 w-full rounded-lg object-cover"
        />
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Đang upload..." : "Upload"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div>
          <p className="text-green-500">Upload thành công</p>

          <img
            src={imageUrl}
            alt="Ảnh đã upload"
            className="mt-2 h-48 w-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
}
