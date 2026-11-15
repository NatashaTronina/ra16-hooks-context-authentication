import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { useAuth } from '../context/AuthContext';
import type { NewsItem } from '../models/auth';

function NewsFeed() {
  const { authFetch } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    authFetch<NewsItem[]>('/private/news')
      .then((items) => {
        if (!ignore) {
          setNews(items);
        }
      })
      .catch((loadError: unknown) => {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : 'Не удалось загрузить новости');
        }
      });

    return () => {
      ignore = true;
    };
  }, [authFetch]);

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="news-feed">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default NewsFeed;
