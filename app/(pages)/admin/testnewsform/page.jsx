"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './imageUploader';
import styles from '../newsform/newsform.module.css';

export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/admin/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    const postData = {
      title,
      content,
      category,
      imageUrl,
      date: currentDate,
      time: currentTime
    };

    try {
      const response = await fetch('https://jjapi.vercel.app/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        console.error('Failed to submit news');
        return;
      }

      const data = await response.json();
      console.log('News submitted successfully:', data);

      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setIsImageUploaded(false);

    } catch (error) {
      console.error('Error submitting news:', error);
    }
  };

  if (!isLoggedIn) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Submit News</h1>

        <ImageUploader
          onUploadSuccess={(url) => {
            setImageUrl(url);
            setIsImageUploaded(true);
          }}
        />

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.inputField}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Content</label>
            <textarea
              className={styles.textareaField}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.inputField}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="agriculture">Agriculture</option>
              <option value="jobs">Jobs</option>
              <option value="culture">Culture</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isImageUploaded}
          >
            Submit News
          </button>
        </form>

        <button
          className={`${styles.button} ${styles.logoutButton}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
