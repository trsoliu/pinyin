import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Pencil, Clipboard, Award, Volume2 } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-[#FF6B35]" />,
      title: "拼音学习",
      description: "系统学习声母、韵母和声调",
      link: "/learning",
      color: "bg-[#FFD93D]"
    },
    {
      icon: <Pencil className="w-12 h-12 text-[#4ECDC4]" />,
      title: "趣味练习",
      description: "通过游戏巩固拼音知识",
      link: "/practice",
      color: "bg-[#95E1D3]"
    },
    {
      icon: <Clipboard className="w-12 h-12 text-[#FF6B6B]" />,
      title: "阶段测试",
      description: "检验学习成果，查漏补缺",
      link: "/test",
      color: "bg-[#FF9F9F]"
    },
    {
      icon: <Award className="w-12 h-12 text-[#A683E3]" />,
      title: "学习报告",
      description: "查看学习进度和成就",
      link: "/report",
      color: "bg-[#CBB4D4]"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
          欢迎来到 <span className="text-[#FF6B35]">拼音小达人</span>
        </h1>
        <p className="text-xl text-[#666666] max-w-2xl mx-auto">
          专为6-8岁儿童设计的拼音学习工具，通过趣味互动帮助孩子轻松掌握汉语拼音
        </p>
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.link}
            className={`${feature.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center`}
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[#333333]">{feature.title}</h3>
            <p className="text-[#333333]">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* 学习进度展示 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-[#333333] mb-4 flex items-center">
          <Volume2 className="w-6 h-6 mr-2 text-[#4ECDC4]" />
          我的学习进度
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">声母学习</span>
              <span>8/21</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-[#FF6B35] h-4 rounded-full" style={{width: '38%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">韵母学习</span>
              <span>5/24</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-[#4ECDC4] h-4 rounded-full" style={{width: '21%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">声调掌握</span>
              <span>2/4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-[#FFD93D] h-4 rounded-full" style={{width: '50%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 奖励展示 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#333333] mb-4">我的成就</h2>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
          ))}
          <div className="w-20 h-20 rounded-full bg-[#FFD93D] flex items-center justify-center border-2 border-[#FFC107] shadow-md">
            <Award className="w-10 h-10 text-[#333333]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;