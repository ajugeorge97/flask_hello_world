import { useEffect, useState } from "react";

export const BACKEND_URL = import.meta.env.BACKEND_URL || "http://127.0.0.1:5001";

export default function ImagesPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/images`) // Your Flask route returning JSON { images: [...] }
      .then(res => res.json())
      .then(data => setImages(data.images || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Uploaded Images</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Thumbnail</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Filename</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <img src={`${BACKEND_URL}/uploads/${img}`} alt={img} width={100} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{img}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}