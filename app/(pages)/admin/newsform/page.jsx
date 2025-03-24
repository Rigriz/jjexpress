"use client"; // Mark this file as a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './newsform.module.css'; // Import the CSS module

export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/admin/login'); // Redirect to login if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/admin/'); // Redirect to login page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the news data to your database or API
    alert(`News submitted: ${title} \n${content}`);

    // Reset the form after submission
    setTitle('');
    setContent('');
  };

  if (!isLoggedIn) {
    return <p>Loading...</p>; // Show loading while checking login state
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Submit News</h1>
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
          <button type="submit" className={styles.button}>Submit News</button>
        </form>
        <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
