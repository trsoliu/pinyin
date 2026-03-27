import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Pencil, Clipboard, BarChart, User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useCurrentUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    refreshUser();
    navigate('/');
  };

  // 关闭移动端菜单当路由改变时
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]); // 添加 location.pathname 依赖项，当路由变化时关闭菜单

  return (
    <header className="bg-[#FF6B35] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#FF6B35] font-bold text-xl">拼</span>
            </div>
            <h1 className="text-2xl font-bold">拼音小达人</h1>
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex space-x-1">
            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <Home className="w-5 h-5 mr-2" />
              首页
            </Link>
            <Link to="/learning" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              学习
            </Link>
            <Link to="/practice" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <Pencil className="w-5 h-5 mr-2" />
              练习
            </Link>
            <Link to="/test" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <Clipboard className="w-5 h-5 mr-2" />
              测试
            </Link>
            <Link to="/report" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              报告
            </Link>
            <Link to="/parent" className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center">
              <User className="w-5 h-5 mr-2" />
              家长
            </Link>
            
            {/* 用户状态相关按钮 */}
            {currentUser ? (
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg bg-[#4ECDC4] hover:bg-[#3dbbb4] transition-colors flex items-center font-medium">
                  <User className="w-5 h-5 mr-2" />
                  {currentUser.name}
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-lg bg-[#4ECDC4] hover:bg-[#3dbbb4] transition-colors flex items-center font-medium">
                <LogIn className="w-5 h-5 mr-2" />
                账户
              </Link>
            )}
          </nav>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-[#e55a2b] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5 mr-2" />
                首页
              </Link>
              <Link 
                to="/learning" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                学习
              </Link>
              <Link 
                to="/practice" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Pencil className="w-5 h-5 mr-2" />
                练习
              </Link>
              <Link 
                to="/test" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Clipboard className="w-5 h-5 mr-2" />
                测试
              </Link>
              <Link 
                to="/report" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart className="w-5 h-5 mr-2" />
                报告
              </Link>
              <Link 
                to="/parent" 
                className="px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-2" />
                家长
              </Link>
              
              {/* 移动端用户状态相关按钮 */}
              {currentUser ? (
                <div className="pt-2 border-t border-white/20">
                  <div className="px-4 py-2 text-sm">
                    欢迎, {currentUser.name}!
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    退出登录
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/20">
                  <Link 
                    to="/login" 
                    className="w-full text-center px-4 py-2 rounded-lg bg-[#4ECDC4] hover:bg-[#3dbbb4] transition-colors flex items-center justify-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    账户
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;