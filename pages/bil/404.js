// pages/404.js
import React from 'react';
import Link from 'next/link';
import styles from './404.module.css'; // Import CSS Module สำหรับการตกแต่ง

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" legacyBehavior>
        <a className={styles.homeLink}>Go back to Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
