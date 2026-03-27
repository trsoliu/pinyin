import { useState, useEffect } from 'react';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = () => {
      try {
        const userStr = localStorage.getItem('currentUser');
        const user = userStr ? JSON.parse(userStr) : null;
        setCurrentUser(user);
      } catch (err) {
        console.error('获取当前用户信息失败:', err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
    
    // 监听 localStorage 变化
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        fetchCurrentUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const refreshUser = () => {
    try {
      const userStr = localStorage.getItem('currentUser');
      const user = userStr ? JSON.parse(userStr) : null;
      setCurrentUser(user);
    } catch (err) {
      console.error('刷新用户信息失败:', err);
      setCurrentUser(null);
    }
  };

  return { currentUser, loading, refreshUser };
};