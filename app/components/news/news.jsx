import React, { useEffect, useState } from 'react';
import styles from './news.module.css'; // Make sure to import your CSS file

function NewsItem({ collectionName }) {
    const [articles, setArticles] = useState([]); // State to hold articles
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log('Fetching data for collection:', collectionName);
                const apiUrl = `https://jjapi.vercel.app/api/${collectionName}?collection=${collectionName}`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData);
                // Check the structure of jsonData here
                if (jsonData && jsonData[collectionName]) {
                    setArticles(jsonData[collectionName]); // Correctly access data by collectionName
                    console.log('Articles:', jsonData[collectionName]);
                } else {
                    setError('No articles found');
                }
            } catch (error) {
                console.error("Error retrieving data:", error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Call the fetch function
        

    }, [collectionName]); // Trigger the effect when collectionName changes
     
    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    return (
        <div>
            {articles.length === 0 ? (
                <p>No articles available.</p> // Show a message if no articles are found
            ) : (
                articles.map((article, index) => (
                    <Item key={index} title={article.title} imageUrl={article.image} />
                ))
            )}
        </div>
    );
}

export const Item = ({ title, imageUrl }) => (
    <div className={styles.news_item}>
        <div className={styles.news_text}>
            {title}
        </div>
        <div className={styles.news_image}>
            <img src={imageUrl} alt="News" />
        </div>
    </div>
);

export default NewsItem;
