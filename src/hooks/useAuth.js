import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkEmailExists = useCallback(async (email) => {
    try {
      const { data, error } = await supabase
        .from('users_69564')
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code === 'PGRST116') {
        return false;
      }

      if (error) {
        throw error;
      }

      return Boolean(data);
    } catch (err) {
      console.error('检查邮箱失败:', err);
      return false;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      if (!userData.email?.trim()) {
        throw new Error('邮箱地址不能为空');
      }

      if (!userData.name?.trim()) {
        throw new Error('姓名不能为空');
      }

      if (!userData.role) {
        throw new Error('请选择用户类型');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('请输入有效的邮箱地址');
      }

      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        throw new Error('该邮箱已被注册');
      }

      const { data, error: insertError } = await supabase
        .from('users_69564')
        .insert([{
          email: userData.email.trim(),
          name: userData.name.trim(),
          role: userData.role,
          age: userData.age ? parseInt(userData.age, 10) : null,
          avatar_url: userData.avatar_url || null
        }])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      localStorage.setItem('currentUser', JSON.stringify(data));

      return { success: true, user: data };
    } catch (err) {
      setError(err.message || '注册失败，请稍后重试');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [checkEmailExists]);

  const login = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);

      if (!email?.trim()) {
        throw new Error('请输入邮箱地址');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('请输入有效的邮箱地址');
      }

      const { data, error: queryError } = await supabase
        .from('users_69564')
        .select('*')
        .eq('email', email.trim())
        .single();

      if (queryError && queryError.code === 'PGRST116') {
        throw new Error('该邮箱尚未注册，请先注册');
      }

      if (queryError) {
        throw queryError;
      }

      if (!data) {
        throw new Error('用户不存在');
      }

      localStorage.setItem('currentUser', JSON.stringify(data));

      return { success: true, user: data };
    } catch (err) {
      setError(err.message || '登录失败，请稍后重试');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = useCallback(() => {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    return { success: true };
  }, []);

  return {
    loading,
    error,
    register,
    login,
    checkEmailExists,
    getCurrentUser,
    logout
  };
};