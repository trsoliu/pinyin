import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, Mail, User, Calendar, Shield, CheckCircle, AlertCircle, LogIn } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'child',
    age: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '姓名至少需要2个字符';
    }

    if (formData.role === 'child' && formData.age) {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 3 || ageNum > 18) {
        newErrors.age = '年龄必须在3-18岁之间';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      age: role === 'parent' ? '' : prev.age
    }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    const result = await register({
      email: formData.email,
      name: formData.name,
      role: formData.role,
      age: formData.age ? parseInt(formData.age, 10) : null
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setSubmitError(result.error);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFE4D6] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">注册成功！</h2>
          <p className="text-gray-600 mb-4">欢迎加入拼音小达人</p>
          <p className="text-sm text-gray-500">正在跳转到首页...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFE4D6] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">注册账号</h1>
            <p className="text-white/90 text-sm">加入拼音小达人，开启快乐学习之旅</p>
          </div>

          <div className="p-6">
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择用户类型
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('child')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'child'
                        ? 'border-[#4ECDC4] bg-[#4ECDC4]/10'
                        : 'border-gray-200 hover:border-[#4ECDC4]/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">👦</div>
                    <div className="font-medium text-gray-800">我是小朋友</div>
                    <div className="text-xs text-gray-500">6-12岁</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('parent')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'parent'
                        ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                        : 'border-gray-200 hover:border-[#FF6B35]/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">👨‍👩‍👧</div>
                    <div className="font-medium text-gray-800">我是家长</div>
                    <div className="text-xs text-gray-500">查看学习进度</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  邮箱地址
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱地址"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#FF6B35]'
                  } focus:outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  姓名
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={formData.role === 'child' ? '请输入小朋友的名字' : '请输入您的姓名'}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#FF6B35]'
                  } focus:outline-none`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {formData.role === 'child' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    年龄（选填）
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="请输入年龄"
                    min="3"
                    max="18"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.age
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-[#FF6B35]'
                    } focus:outline-none`}
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                  )}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      注册中...
                    </span>
                  ) : (
                    '立即注册'
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  注册即表示您同意我们的
                  <button type="button" className="text-[#FF6B35] hover:underline mx-1">服务条款</button>
                  和
                  <button type="button" className="text-[#FF6B35] hover:underline mx-1">隐私政策</button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 bg-white/50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>您的信息将被安全保护</span>
            </div>
            <Link 
              to="/login" 
              className="text-sm text-[#4ECDC4] hover:text-[#3dbbb4] font-medium inline-flex items-center"
            >
              <LogIn className="w-4 h-4 mr-1" />
              已有账号？去登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;