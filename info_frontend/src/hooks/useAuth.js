import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bw_user')); } catch { return null; }
  });

  useEffect(() => {
    const handler = () => {
      try { setUser(JSON.parse(localStorage.getItem('bw_user'))); } catch { setUser(null); }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = (token, userObj) => {
    localStorage.setItem('bw_token', token);
    localStorage.setItem('bw_user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem('bw_token');
    localStorage.removeItem('bw_user');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, login, logout };
}
