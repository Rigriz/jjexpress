"use client"
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import style from './topiclayout.module.css';
//import TopicLayout from './components/TopicLayout';
import NewsItem, { SingleItem } from './components/news/news.jsx';
//import SuccessPage from './admin/SuccessPage';
//import PasswordInput from './admin/PasswordInput';
import styles from "./page.module.css";
//import NewsItem from './(pages)/sports/page';
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccess = () => {
    setIsAuthenticated(true);
  };
  const TopicLayout = () => {
    const topics = ["sports", "jobs", "agriculture", "culture"];
    const newsItems = [
      { id: 1, title: 'News Item 1', description: 'Description of News 1' },
      { id: 2, title: 'News Item 2', description: 'Description of News 2' },
      { id: 3, title: 'News Item 3', description: 'Description of News 3' },
      { id: 4, title: 'News Item 4', description: 'Description of News 4' },
      { id: 5, title: 'News Item 5', description: 'Description of News 5' },
      { id: 6, title: 'News Item 6', description: 'Description of News 6' },
      { id: 7, title: 'News Item 7', description: 'Description of News 7' },
      { id: 8, title: 'News Item 8', description: 'Description of News 8' },
    ];

    return (
      <div className={style.container}>
        {topics.map((topic, index) => (
          <div key={index} className={style.topicItem}>
            {topic}
            <div className={style.topicContainer}>
              <SingleItem collectionName={topic} index={0} />
              <SingleItem collectionName={topic} index={1} />
              <SingleItem collectionName={topic} index={2} />
              <SingleItem collectionName={topic} index={3} />
              <h1>
                12
              </h1>
              <h1>
                12
              </h1>
            </div>
          </div>
        ))}
      </div>
    );
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
          <NewsItem collectionName="jobs" />
        </div>
        <TopicLayout />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
