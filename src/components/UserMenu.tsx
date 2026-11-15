import type { Profile } from '../models/auth';

interface UserMenuProps {
  profile: Profile;
  onLogout: () => void;
}

function UserMenu({ profile, onLogout }: UserMenuProps) {
  return (
    <div className="user-menu">
      <span>Hello, {profile.name}</span>
      <img className="user-menu__avatar" src={profile.avatar} alt="" />
      <button type="button" className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default UserMenu;
