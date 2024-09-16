import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate をインポート
import './Register.css'; // スタイルシートも作成

const POST_URL =
  'https://script.google.com/macros/s/AKfycbzPE7VJmohiS3c-KvdhLjQjfkq__6hJu6Z3BANVFAYaTKNaYFWHeVYd8R0ZtxgvVrDIYA/exec'; // GASのデプロイURLをここに

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
    const params = new URLSearchParams();
    params.append('activityName', activityName);
    params.append('youtubeURL', youtubeURL);
    params.append('xURL', xURL);

    try {
      const response = await fetch(POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: params.toString(),
        mode: 'cors',
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // 詳細なエラーメッセージを取得
        throw new Error(
          `ネットワークの応答が正しくありません: ${errorMessage}`
        );
      }

      const responseData = await response.json();
      if (responseData.activityName) {
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
      <h2>VTuber 配信登録フォーム</h2>
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
