import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#4ECDC4] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold flex items-center">
              拼音小达人 <Heart className="w-5 h-5 mx-2 text-[#FF6B35]" /> 快乐学习
            </h2>
            <p className="text-sm mt-1">让每个孩子都能轻松掌握拼音</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm">© 2025 拼音小达人 All Rights Reserved</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-[#FF6B35] transition-colors">使用说明</a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors">联系我们</a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors">隐私政策</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;