import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Pencil, Clipboard, BarChart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#FF6B35] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#FF6B35] font-bold text-xl">拼</span>
            </div>
            <h1 className="text-2xl font-bold">拼音小达人</h1>
          </Link>
          
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
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-[#e55a2b] transition-colors">
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;