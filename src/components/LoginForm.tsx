import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await login(loginValue, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Не удалось войти');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <span className="text-danger">{error}</span>}
      <input className="form-control" placeholder="Username" value={loginValue} onChange={(event) => setLoginValue(event.target.value)} />
      <input className="form-control" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit" className="btn btn-outline-success">Login</button>
    </form>
  );
}

export default LoginForm;
