import { useState } from "react";

export const BACKEND_URL = import.meta.env.BACKEND_URL || "http://127.0.0.1:5001";

export default function UploadForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!name || !file) {
      alert("Please provide a name and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("filename", name);

    try {
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      {/* Filename input */}
      <input
        type="text"
        placeholder="Enter filename"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />

      {/* File input */}
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFile(files[0]);
          } else {
            setFile(null);
          }
        }}
        style={{ marginRight: "0.5rem" }}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
