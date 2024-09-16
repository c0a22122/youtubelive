import React, { useEffect } from 'react';
import './OpeningAnimation.css'; // 必要に応じてスタイルを適用

const OpeningAnimation = ({ onAnimationEnd }) => {
  useEffect(() => {
    if (typeof onAnimationEnd === 'function') {
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, 3000); // アニメーションの長さに応じて調整

      return () => clearTimeout(timer);
    }
  }, [onAnimationEnd]);

  return (
    <div className="opening-animation">
      <div className="icon">🌟</div>
      <div className="title">Welcome to the Stream</div>
    </div>
  );
};

export default OpeningAnimation;
