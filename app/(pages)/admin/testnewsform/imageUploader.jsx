'use client';
import { useState } from 'react';
import styles from '../login.module.css'; // You can rename this for clarity

export default function ImageUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {   //https://jjapi.vercel.app/
      const res = await fetch('http://localhost:3000/api/uploadimage', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert('Upload failed: ' + data.error);
        return;
      }

      setImageUrl(data.imageUrl);
      setIsImageUploaded(true);
      onUploadSuccess(data.imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Something went wrong during upload.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <h2>Upload News Image</h2>
      <div className={styles.imageUploadWrapper}>
        <input
          type="file"
          className={styles.imageInput}
          onChange={handleUpload}
          accept="image/*"
        />
        {isImageUploaded && <span className={styles.checkmark}>✅</span>}
        {imageUrl && (
          <div className={styles.imageUpload}>
            <p>Image URL:</p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
            <img
              src={imageUrl}
              className={styles.imgPreview}
              alt="Uploaded"
              width={200}
            />
          </div>
        )}
        {uploading && <p>Uploading...</p>}
      </div>
    </div>
  );
}
