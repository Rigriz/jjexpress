'use client';
import React, { useEffect, useState } from 'react';
import styles from '../newsitem.module.css'; // Ensure you import your CSS file
import Spinner from '../../components/Spinner'; // Import the Spinner component

function NewsItem() {
  const [articles, setArticles] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://jjapi.vercel.app/api/jobs?collection=jobs';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setArticles(jsonData.jobs);
      } catch (error) {
        console.error("Error retrieving data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const Item = ({ title, imageUrl }) => (
    <div className={styles.news_item}>
      <div className={styles.news_text}>
        {title}
      </div>
      <div className={styles.news_image}>
        <img src={imageUrl} alt="News" />
      </div>
    </div>
  );

  if (loading) {
    return <Spinner />; // Display the spinner while loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.news_item_container}>
      {articles.map((article, index) => (
        <Item key={index} title={article.title} imageUrl={article.image} />
      ))}
    </div>
  );
}

export default NewsItem;
