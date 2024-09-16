import React from 'react';
import { motion } from 'framer-motion'; // framer-motionを追加
import './Header.css'; // スタイルシートを作成

const Header = ({ onTitleClick }) => {
  return (
    <header className="header" onClick={onTitleClick}>
      <motion.h1
        className="header-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.035, color: '#903dc4' }} // ホバー時のアニメーション
      >
        Live Streams
      </motion.h1>
    </header>
  );
};

export default Header;
