import React from 'react';

import styles from './style.module.css';

// 서비스 시작 시 가장 처음 보여지는 페이지
// 인터렉티브한 화면(왜곡된 원 3개가 불규칙적으로 돌아가는 모양)으로 시각적인 효과
function HomePage() {
  return (
    <div className={styles.background}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <h2>
          {/* <Link to="/home" className="link"></Link> */}
          {/* navbar가 사라지는 오류가 생김=> a 태그로 변경 */}
          {/* 'Daily Diary' 글자 클릭 시 /home 으로 이동 */}
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
