"use client"
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import NewsItem from './components/news/news';
//import SuccessPage from './admin/SuccessPage';
//import PasswordInput from './admin/PasswordInput';
import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.Appheader}>
          <Navbar />
        </header>
        <div>
        </div>
        <div className={styles.DisplayNews} style={{ margin: "12px 12px" }}>
          <NewsItem />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
