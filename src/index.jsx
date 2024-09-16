import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ルート要素を作成
const root = ReactDOM.createRoot(document.getElementById('root'));

// アプリコンポーネントをレンダリング
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
