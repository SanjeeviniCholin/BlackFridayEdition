import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authFetch } from '../utils/api';
import "../styles/Login.css";

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please provide email and password'); return; }
    setLoading(true);
    try {
  const res = await authFetch('/auth/login', 'POST', { email, password });

  console.log("LOGIN SUCCESS RESPONSE:", res);

  sessionStorage.setItem('sessionToken', res.token);
  sessionStorage.setItem('user', JSON.stringify(res.user));

  navigate('/home');
} 
catch (err) {
  console.log("LOGIN ERROR:", err);
  setError(err?.body?.message || 'Login failed');
}
  };

  return (
    <div className="login-wrapper"> 
      <div className="login-box"> 
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h3 className="mb-6 text-center">Login</h3>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" type="email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} className="form-control" type="password" required />
              </div>
              <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
              <Link to="/signup" className="btn btn-link">Sign up</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
