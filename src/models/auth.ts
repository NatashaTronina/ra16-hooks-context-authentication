export interface Profile {
  id: string;
  login: string;
  name: string;
  avatar: string;
}

export interface Session {
  token: string;
  profile: Profile;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  content: string;
}
