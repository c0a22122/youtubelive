import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // framer-motionを追加
import { getLiveStreams } from '../api/youtube';
import { Sparkles } from 'lucide-react'; // アイコン用
import './LiveStreamList.css'; // 必要に応じてスタイルを適用

const LiveStreamList = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStreams = async () => {
      try {
        setLoading(true);
        const streamsData = await getLiveStreams();
        setStreams(streamsData);
      } catch (err) {
        console.error('Error fetching live streams:', err);
        setError('Failed to load live streams.');
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
  }, []);

  return (
    <div className="live-stream-list">
      {loading ? (
        <div className="loading-spinner-container">
          {/* ローディングスピナー */}
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : streams.length === 0 ? (
        <p className="no-streams">No live streams available</p>
      ) : (
        <motion.div
          className="streams-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
        >
          {streams.map((stream) => (
            <motion.div
              key={stream.id}
              className="live-stream-item"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${stream.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="stream-link"
              >
                <div className="relative">
                  {/* サムネイル */}
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="stream-thumbnail"
                  />
                  {/* "Live"バッジをサムネイル右上に表示 */}
                  <div className="live-badge">
                    <Sparkles className="live-icon" />
                    Live
                  </div>
                </div>
                <div className="stream-info">
                  <h3 className="stream-title">{stream.title}</h3>
                  <p className="stream-channel">{stream.channelTitle}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LiveStreamList;
