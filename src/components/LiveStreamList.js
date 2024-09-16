import React, { useEffect, useState } from 'react';
import { getLiveStreams } from '../api/youtube';
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
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : streams.length === 0 ? (
        <p className="no-streams">No live streams available</p>
      ) : (
        <div className="streams-container">
          {streams.map((stream) => (
            <div key={stream.id} className="live-stream-item">
              <a
                href={`https://www.youtube.com/watch?v=${stream.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="stream-link"
              >
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="stream-thumbnail"
                />
                <div className="stream-info">
                  <h3 className="stream-title">{stream.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveStreamList;
