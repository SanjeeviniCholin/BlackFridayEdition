import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authFetch } from '../utils/api';

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(()=> {
    async function check() {
      const token = sessionStorage.getItem('sessionToken');
      if (!token) { setChecking(false); setOk(false); return; }
      try {
        await authFetch('/api/me', 'GET', null, token);
        setOk(true);
      } catch (err) {
        setOk(false);
      } finally {
        setChecking(false);
      }
    }
    check();
  }, []);

  if (checking) return <div>Checking authentication...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}
