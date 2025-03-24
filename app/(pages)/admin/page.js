"use client"; // Ensure this is a client component
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import styles from './login.module.css'; // Import the CSS module

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const adminUsername = 'admin';
  const adminPassword = 'password123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === adminUsername && password === adminPassword) {
      setError('');
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/admin/newsform'); // Ensure this route exists
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
              className={styles.inputField}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
