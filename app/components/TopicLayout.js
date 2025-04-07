
import  styles from './topiclayout.moudle.css'
const TopicLayout = () => {
    const topics = ["Sports", "Jobs", "Agriculture", "Culture"];
  
    return (
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`${styles.topic} ${styles[`topic${index + 1}`]}`}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default TopicLayout;