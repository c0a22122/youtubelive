const API_KEY = 'AIzaSyBBj66BZXSzqj4-yZs24P58erAP0KQr24w'; // YouTube APIキーを入力してください
const CHANNELS = ['UCgIfLpQvelloDi8I0Ycbwpg', 'UC4YaOt1yT-ZeyB0OmxHgolA'];

const CACHE_KEY = 'liveStreamsCache';
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1時間（ミリ秒）

const fetchStreamsFromChannel = async (channelId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&eventType=live&type=video`
    );
    const data = await response.json();
    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      viewerCount: 'Unknown', // YouTube APIでは直接視聴者数を取得できません。別のAPIが必要な場合があります。
    }));
  } catch (error) {
    console.error(`Failed to fetch data for channel ${channelId}:`, error);
    return [];
  }
};

const getCachedData = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

  if (cachedData && cacheTimestamp) {
    const age = Date.now() - parseInt(cacheTimestamp, 10);
    if (age < CACHE_EXPIRY_MS) {
      return JSON.parse(cachedData);
    }
  }
  return null;
};

const setCachedData = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
};

export const getLiveStreams = async () => {
  const cachedData = getCachedData();

  if (cachedData) {
    return cachedData;
  }

  const allStreams = [];

  for (const channelId of CHANNELS) {
    const streams = await fetchStreamsFromChannel(channelId);
    allStreams.push(...streams);
  }

  setCachedData(allStreams);
  return allStreams;
};
