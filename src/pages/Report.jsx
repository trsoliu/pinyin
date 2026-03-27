import React, { useState } from 'react';
import { Award, Trophy, Target, Clock, RotateCcw, BarChart3 } from 'lucide-react';

const Report = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟学习数据
  const learningData = {
    totalLessons: 25,
    completedLessons: 15,
    totalTests: 3,
    averageScore: 85,
    totalTime: 120, // 分钟
    streak: 7 // 连续学习天数
  };

  // 模拟成就数据
  const achievements = [
    { id: 1, name: "初学者", description: "完成第一课学习", unlocked: true, date: "2025-01-15" },
    { id: 2, name: "声母大师", description: "完成所有声母学习", unlocked: true, date: "2025-01-20" },
    { id: 3, name: "韵母专家", description: "完成所有韵母学习", unlocked: false },
    { id: 4, name: "测试达人", description: "完成第一次测试", unlocked: true, date: "2025-01-25" },
    { id: 5, name: "满分冠军", description: "测试获得满分", unlocked: false },
    { id: 6, name: "坚持不懈", description: "连续学习7天", unlocked: true, date: "2025-01-30" }
  ];

  // 模拟测试历史
  const testHistory = [
    { id: 1, date: "2025-01-25", score: 85, total: 10, time: 3, type: "阶段测试一" },
    { id: 2, date: "2025-02-01", score: 90, total: 10, time: 4, type: "阶段测试二" },
    { id: 3, date: "2025-02-08", score: 75, total: 10, time: 5, type: "阶段测试三" }
  ];

  // 模拟错题
  const wrongQuestions = [
    { id: 1, question: "shū 的声调是第几声？", correct: "第一声", selected: "第四声", date: "2025-02-08" },
    { id: 2, question: "哪个是正确的拼音：kāfēi 还是 kǎfēi？", correct: "kāfēi", selected: "kǎfēi", date: "2025-02-01" }
  ];

  const getProgressPercentage = () => {
    return Math.round((learningData.completedLessons / learningData.totalLessons) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">学习报告</h1>
      
      {/* 标签页切换 */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-md">
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-[#FF6B35] text-white' 
                : 'text-[#666666] hover:text-[#FF6B35]'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            学习概览
          </button>
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'achievements' 
                ? 'bg-[#4ECDC4] text-white' 
                : 'text-[#666666] hover:text-[#4ECDC4]'
            }`}
            onClick={() => setActiveTab('achievements')}
          >
            我的成就
          </button>
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'history' 
                ? 'bg-[#FFD93D] text-[#333333]' 
                : 'text-[#666666] hover:text-[#FFD93D]'
            }`}
            onClick={() => setActiveTab('history')}
          >
            测试历史
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-[#FF6B35]" />
              学习概览
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#FFD93D]">
                <Trophy className="w-12 h-12 text-[#FFD93D] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningData.completedLessons}</div>
                <div className="text-[#666666]">已完成课程</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#4ECDC4]">
                <Target className="w-12 h-12 text-[#4ECDC4] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningData.averageScore}%</div>
                <div className="text-[#666666]">平均测试成绩</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#FF6B35]">
                <Clock className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningData.totalTime}</div>
                <div className="text-[#666666]">学习总时长(分钟)</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#95E1D3]">
                <Award className="w-12 h-12 text-[#95E1D3] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningData.streak}</div>
                <div className="text-[#666666]">连续学习天数</div>
              </div>
            </div>
            
            {/* 学习进度 */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-medium">课程完成进度</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className="bg-[#FF6B35] h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{width: `${getProgressPercentage()}%`}}
                >
                  {learningData.completedLessons}/{learningData.totalLessons}
                </div>
              </div>
            </div>
            
            {/* 声母韵母进度 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333]">声母学习进度</h3>
                <div className="flex justify-between mb-2">
                  <span>已完成</span>
                  <span>8/21</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-[#4ECDC4] h-4 rounded-full" style={{width: '38%'}}></div>
                </div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333]">韵母学习进度</h3>
                <div className="flex justify-between mb-2">
                  <span>已完成</span>
                  <span>5/24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-[#FFD93D] h-4 rounded-full" style={{width: '21%'}}></div>
                </div>
              </div>
            </div>
            
            {/* 最近错题 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333]">最近错题回顾</h3>
              {wrongQuestions.length > 0 ? (
                <div className="space-y-4">
                  {wrongQuestions.map((question) => (
                    <div key={question.id} className="border-2 border-red-200 rounded-2xl p-4">
                      <div className="font-medium mb-2">{question.question}</div>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          你的答案: {question.selected}
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          正确答案: {question.correct}
                        </div>
                        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {question.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#666666]">
                  暂无错题记录，继续保持！
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-[#FFD93D]" />
              我的成就
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`rounded-2xl p-6 flex flex-col items-center text-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-[#FFD93D] to-[#FFC107] border-2 border-[#FFC107] shadow-lg' 
                      : 'bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                    achievement.unlocked ? 'bg-white' : 'bg-gray-200'
                  }`}>
                    <Award className={`w-12 h-12 ${
                      achievement.unlocked ? 'text-[#FFC107]' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.unlocked ? 'text-[#333333]' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`mb-4 ${
                    achievement.unlocked ? 'text-[#333333]' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked ? (
                    <div className="bg-white bg-opacity-50 px-3 py-1 rounded-full text-sm">
                      解锁于 {achievement.date}
                    </div>
                  ) : (
                    <div className="bg-gray-300 px-3 py-1 rounded-full text-sm text-gray-600">
                      未解锁
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-[#4ECDC4]" />
              测试历史
            </h2>
            
            {testHistory.length > 0 ? (
              <div className="space-y-4">
                {testHistory.map((test) => (
                  <div key={test.id} className="border-2 border-[#4ECDC4] rounded-2xl p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-[#333333]">{test.type}</h3>
                      <div className="bg-[#4ECDC4] text-white px-3 py-1 rounded-full">
                        {test.date}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#FF6B35]">{test.score}</div>
                        <div className="text-[#666666]">得分</div>
                      </div>
                      
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#4ECDC4]">{test.time}分钟</div>
                        <div className="text-[#666666]">用时</div>
                      </div>
                      
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#FFD93D]">{test.score * 10}%</div>
                        <div className="text-[#666666]">正确率</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">暂无测试记录</p>
                <button
                  className="mt-6 bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#e55a2b] transition-colors"
                  onClick={() => window.location.hash = '/test'}
                >
                  去测试
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;