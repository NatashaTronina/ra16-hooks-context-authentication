import type { NewsItem } from '../models/auth';

interface NewsCardProps {
  item: NewsItem;
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={item.image}
        alt=""
        onError={(event) => {
          event.currentTarget.hidden = true;
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.content}</p>
      </div>
    </div>
  );
}

export default NewsCard;
