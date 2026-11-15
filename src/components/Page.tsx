import Landing from './Landing';
import NewsFeed from './NewsFeed';
import Toolbar from './Toolbar';
import { useAuth } from '../context/AuthContext';

function Page() {
  const { token } = useAuth();

  return (
    <>
      <Toolbar />
      {token ? <NewsFeed /> : <Landing />}
    </>
  );
}

export default Page;
