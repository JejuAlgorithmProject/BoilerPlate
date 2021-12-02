import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

function HomePage(props) {
  return (
    <div className={styles.background}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <h2>
          {/* <Link to="/home" className="link"></Link> */}
          {/* navbar가 사라지는 오류가 생김=> a 태그로 변경 */}
          <a href="/home" className={styles.link}>
            {' '}
            Daily Diary
          </a>
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
