import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, Mail, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('请输入邮箱地址');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入有效的邮箱地址');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail()) {
      return;
    }

    const result = await login(email);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFE4D6] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">登录成功！</h2>
          <p className="text-gray-600 mb-4">欢迎回来，{email}</p>
          <p className="text-sm text-gray-500">正在跳转到首页...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFE4D6] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-[#4ECDC4]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">欢迎登录</h1>
            <p className="text-white/90 text-sm">继续您的拼音学习之旅</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  邮箱地址
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="请输入注册时的邮箱地址"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    error
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#4ECDC4]'
                  } focus:outline-none`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      登录中...
                    </span>
                  ) : (
                    '立即登录'
                  )}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  还没有账号？
                  <Link 
                    to="/register" 
                    className="text-[#FF6B35] hover:text-[#e55a2b] font-medium ml-1 inline-flex items-center"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    立即注册
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 bg-white/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-500">
            💡 提示：登录只需输入注册时的邮箱地址即可
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;