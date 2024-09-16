import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート
import './Register.css'; // スタイルシートも作成

const POST_URL =
  'https://script.google.com/macros/s/AKfycbyeE38ynDz6lKJI8bm4CcLED52XBeARd9aQDfCxRbe8S6D0zPuy4FgtDK5NhqWACp6Tow/exec'; // GASのデプロイURLをここに

const Register = () => {
  const navigate = useNavigate(); // useNavigate を初期化
  const [activityName, setActivityName] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [xURL, setXURL] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formRef = useRef(null); // フォームのための ref を作成

  // 外側をクリックしたときの処理
  const handleClickOutside = useCallback(
    (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        navigate('/'); // 最初の画面にナビゲート
      }
    },
    [navigate]
  ); // `navigate` を依存関係として追加

  // マウント時にクリックイベントリスナーを取り付け
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]); // `handleClickOutside` を依存関係として追加

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = `activityName=${encodeURIComponent(
      activityName
    )}&&youtubeURL=${encodeURIComponent(youtubeURL)}&&xURL=${encodeURIComponent(
      xURL
    )}`;

    try {
      const response = await fetch(POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          Accept: 'application/json', // レスポンスがJSONであることを期待
        },
        body: data,
        mode: 'cors',
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // 詳細なエラーメッセージを取得
        throw new Error(
          `ネットワークの応答が正しくありません: ${errorMessage}`
        );
      }

      const responseData = await response.json(); // レスポンスをJSONとして処理

      // レスポンス内容をコンソールにログ出力
      console.log('レスポンスデータ:', responseData);

      if (responseData.activityName) {
        // レスポンスにactivityNameが含まれているか確認
        setSuccessMessage('送信に成功しました！');
        setError('');
        setActivityName('');
        setYoutubeURL('');
        setXURL('');
      } else {
        setError('送信に失敗しました。再度お試しください。');
        setSuccessMessage('');
      }
    } catch (error) {
      setError(`通信エラーが発生しました: ${error.message}`);
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>配信登録フォーム</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          活動名:
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            required
          />
        </label>
        <label>
          YouTube URL:
          <input
            type="url"
            value={youtubeURL}
            onChange={(e) => setYoutubeURL(e.target.value)}
            required
          />
        </label>
        <label>
          X (旧Twitter) URL:
          <input
            type="url"
            value={xURL}
            onChange={(e) => setXURL(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Register;
