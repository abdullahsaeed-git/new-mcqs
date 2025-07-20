import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin } from '../auth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // if (authenticateAdmin(username, password)) {
    //   navigate('/admin/dashboard');
    // } else {
    //   setError('Invalid credentials');
    // }
    if (authenticateAdmin(username, password)) {
      sessionStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    }else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Admin Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
}