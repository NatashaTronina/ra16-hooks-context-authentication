import LoginForm from './LoginForm';
import UserMenu from './UserMenu';
import { useAuth } from '../context/AuthContext';

function Toolbar() {
  const { profile, logout } = useAuth();

  return (
    <nav className="navbar bg-light toolbar">
      <span className="navbar-brand">Neto Social</span>
      {profile ? <UserMenu profile={profile} onLogout={logout} /> : <LoginForm />}
    </nav>
  );
}

export default Toolbar;
