import React from 'react';
import './Header.css'; // スタイルシートを作成

const Header = ({ onTitleClick }) => {
  return (
    <header className="header" onClick={onTitleClick}>
      <h1>Live Streams</h1>
    </header>
  );
};

export default Header;
