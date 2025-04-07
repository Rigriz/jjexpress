"use client"
import React, { useEffect, useState } from 'react';
import styles from '../newsitem.module.css'; // Make sure to import your CSS file

function NewsItem() {
    const [articles, setArticles] = useState([]); // State to hold articles
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://jjapi.vercel.app/api/politics?collection=politics';
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Fixed typo here
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                //console.log(jsonData);
                setArticles(jsonData.politics); // Ensure this path is correct
            } catch (error) {
                console.error("Error retrieving data:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once on mount

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
        return <div>Loading...</div>; // Loading state
    }
    if (error) {
        return <div>Error: {error}</div>; // Error state
    }
    return (
        <div>
            {articles.map((article, index) => (
                <Item key={index} title={article.title} imageUrl={article.image} />
            ))}
        </div>
    );
}
export default NewsItem;