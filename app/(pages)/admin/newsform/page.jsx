"use client"; // Mark this file as a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './newsform.module.css'; // Import the CSS module
import { supabase} from '../../../../lib/supabase';
export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false); // NEW
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
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
  };// https://lofmxkscqxqjuulvtpvg.supabase.co/storage/v1/s3
  const handleUpload = async (e) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('Session:', session);
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { data, error } = await supabase.storage
      .from('newsimage') // your bucket name
      .upload(filePath, file);
    if (error) {
      console.log('Upload error:', error.message);
      alert('Image upload failed. Please try again.');
      setUploading(false);
      return;
    }
    const { data: publicURL } = supabase.storage
      .from('newsimage')
      .getPublicUrl(filePath);
    setImageUrl(publicURL.publicUrl);
    setUploading(false);
    setIsImageUploaded(true);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked")
    //if (!isImageUploaded) {
    // alert('Please upload an image before submitting.');
    //return;
    //
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5);  // HH:MM
    const postData = {
      title,
      content,
      category,
      imageUrl,
      imageUrl,
      date: currentDate,
      time: currentTime
    };
    console.log(category);
    try {
      const response = await fetch('https://jjapi.vercel.app/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          imageUrl,
          imageUrl,
          date: currentDate,
          time: currentTime        
        }),
      });
      if (!response.ok) {
        console.log('Failed to submit news');
      }
      const data = await response.json();
      console.log('News submitted successfully:', data);
      // Optionally reset form
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setDate('');
      setTime('');
      setIsImageUploaded(false);
    } catch (error) {
      console.error('Error submitting news:', error);
    }
  };

  if (!isLoggedIn) {
    return <p>Loading...</p>; // Show loading while checking login state
  }
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Submit News</h1>
        <div>
          <h2>Upload News Image</h2>
          <div className={styles.imageUploadWrapper}>
            <input type="file" className={styles.imageInput} onChange={handleUpload} accept="image/*" />
            {isImageUploaded && <span className={styles.checkmark}>✅</span>}
            {imageUrl && (
              <div className={styles.imageUpload}>
                <p>Image URL:</p>
                <a href={imageUrl} target="_blank">{imageUrl}</a>
                <img src={imageUrl} className={styles.imgPreview} alt="Uploaded" width={200} />
              </div>
            )}
          </div>
          {uploading && <p>Uploading...</p>}

        </div>
        <form onSubmit={handleSubmit} disabled={!isImageUploaded}>
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
            <label className={styles.label}>Category</label>
            <select
              className={styles.inputField} // you can create a specific class if needed
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
          <button type="submit" className={styles.button} onClick={handleSubmit}>
            Submit News
          </button>

        </form>
        <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
