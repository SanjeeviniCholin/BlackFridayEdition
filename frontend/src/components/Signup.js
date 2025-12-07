import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authFetch } from '../utils/api';
import "../styles/Login.css";

export default function Signup(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please provide email and password'); return; }
    if (password.length < 6) { setError('Password should be at least 6 characters'); return; }

    setLoading(true);
    try {
      const res = await authFetch('/auth/signup', 'POST', { name, email, password });
      sessionStorage.setItem('sessionToken', res.token);
      sessionStorage.setItem('user', JSON.stringify(res.user));
      navigate('/home');
    } catch (err) {
      setError(err?.body?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-wrapper"> 
      <div className="signup-box"> 
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h3 className="mb-3">Signup</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Name (optional)</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" type="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} className="form-control" type="password" required />
            <div className="form-text">At least 6 characters</div>
          </div>
          <button className="btn btn-success" disabled={loading}>{loading ? 'Signing up...' : 'Create account'}</button>
          <Link to="/login" className="btn btn-link">Login</Link>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
