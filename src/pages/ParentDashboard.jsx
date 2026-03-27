import React, { useState } from 'react';
import { User, Clock, BarChart3, Award, Settings, Shield, Timer } from 'lucide-react';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeLimit, setTimeLimit] = useState(60); // 默认60分钟

  // 模拟孩子学习数据
  const childData = {
    name: "小明",
    age: 7,
    avatar: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=儿童,头像&width=100&height=100&random=child_avatar_100_100"
  };

  // 模拟学习统计数据
  const learningStats = {
    todayTime: 45, // 今日学习时间(分钟)
    weekTime: 210, // 本周学习时间(分钟)
    totalLessons: 15,
    completedLessons: 12,
    averageScore: 87,
    streak: 5 // 连续学习天数
  };

  // 模拟测试历史
  const testHistory = [
    { id: 1, date: "2025-02-08", score: 85, type: "声母测试" },
    { id: 2, date: "2025-02-01", score: 90, type: "韵母测试" },
    { id: 3, date: "2025-01-25", score: 78, type: "综合测试" }
  ];

  // 模拟成就数据
  const achievements = [
    { id: 1, name: "初学者", date: "2025-01-15" },
    { id: 2, name: "声母大师", date: "2025-01-20" },
    { id: 4, name: "测试达人", date: "2025-01-25" },
    { id: 6, name: "坚持不懈", date: "2025-01-30" }
  ];

  const getProgressPercentage = () => {
    return Math.round((learningStats.completedLessons / learningStats.totalLessons) * 100);
  };

  const handleTimeLimitChange = () => {
    // 保存时间限制设置
    console.log(`设置学习时间限制为: ${timeLimit}分钟`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">家长监控面板</h1>
      
      {/* 孩子信息卡片 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src={childData.avatar} 
            alt={childData.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-[#4ECDC4] mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#333333] flex items-center justify-center md:justify-start">
              <User className="w-6 h-6 mr-2 text-[#FF6B35]" />
              {childData.name}的学习中心
            </h2>
            <p className="text-[#666666] mb-2">{childData.age}岁</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-[#FFD93D] text-[#333333] px-3 py-1 rounded-full text-sm">
                连续学习 {learningStats.streak} 天
              </span>
              <span className="bg-[#95E1D3] text-[#333333] px-3 py-1 rounded-full text-sm">
                平均分 {learningStats.averageScore}分
              </span>
            </div>
          </div>
        </div>
      </div>
      
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
              activeTab === 'settings' 
                ? 'bg-[#4ECDC4] text-white' 
                : 'text-[#666666] hover:text-[#4ECDC4]'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            使用设置
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {activeTab === 'overview' ? (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-[#FF6B35]" />
              学习统计
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#FF6B35]">
                <Clock className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningStats.todayTime}</div>
                <div className="text-[#666666]">今日学习(分钟)</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#4ECDC4]">
                <BarChart3 className="w-12 h-12 text-[#4ECDC4] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningStats.weekTime}</div>
                <div className="text-[#666666]">本周学习(分钟)</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#FFD93D]">
                <Award className="w-12 h-12 text-[#FFD93D] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningStats.averageScore}%</div>
                <div className="text-[#666666]">平均测试成绩</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#95E1D3]">
                <User className="w-12 h-12 text-[#95E1D3] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{learningStats.streak}</div>
                <div className="text-[#666666]">连续学习天数</div>
              </div>
            </div>
            
            {/* 课程进度 */}
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
                  {learningStats.completedLessons}/{learningStats.totalLessons}
                </div>
              </div>
            </div>
            
            {/* 测试历史 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-[#4ECDC4]" />
                最近测试成绩
              </h3>
              {testHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testHistory.map((test) => (
                    <div key={test.id} className="border-2 border-[#4ECDC4] rounded-2xl p-4">
                      <div className="font-bold text-[#333333] mb-2">{test.type}</div>
                      <div className="text-2xl font-bold text-[#FF6B35] mb-1">{test.score}分</div>
                      <div className="text-sm text-[#666666]">{test.date}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-[#666666]">
                  暂无测试记录
                </div>
              )}
            </div>
            
            {/* 最近成就 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                <Award className="w-5 h-5 mr-2 text-[#FFD93D]" />
                最近获得的成就
              </h3>
              {achievements.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gradient-to-br from-[#FFD93D] to-[#FFC107] rounded-2xl p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
                        <Award className="w-6 h-6 text-[#FFC107]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#333333]">{achievement.name}</div>
                        <div className="text-sm text-[#333333]">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-[#666666]">
                  暂无成就记录
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-[#4ECDC4]" />
              使用设置
            </h2>
            
            <div className="space-y-6">
              {/* 学习时间限制 */}
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-[#FF6B35]" />
                  学习时间限制
                </h3>
                <p className="text-[#666666] mb-4">
                  设置孩子每天使用拼音学习工具的时间上限
                </p>
                
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="180"
                    step="10"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    className="w-full max-w-md mr-4"
                  />
                  <div className="text-2xl font-bold text-[#FF6B35] min-w-[80px]">
                    {timeLimit}分钟
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {[30, 60, 90, 120].map((time) => (
                    <button
                      key={time}
                      className={`px-4 py-2 rounded-full ${
                        timeLimit === time
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-white text-[#333333] border border-[#FF6B35]'
                      }`}
                      onClick={() => setTimeLimit(time)}
                    >
                      {time}分钟
                    </button>
                  ))}
                </div>
                
                <button
                  className="mt-6 bg-[#4ECDC4] text-white px-6 py-3 rounded-full hover:bg-[#3eb8af] transition-colors font-medium"
                  onClick={handleTimeLimitChange}
                >
                  保存设置
                </button>
              </div>
              
              {/* 学习提醒 */}
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#4ECDC4]" />
                  学习提醒设置
                </h3>
                <p className="text-[#666666] mb-4">
                  设置每日学习提醒时间，帮助孩子养成学习习惯
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#333333] mb-2">提醒时间</label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-xl"
                      defaultValue="18:00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#333333] mb-2">提醒频率</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl">
                      <option>每天</option>
                      <option>工作日</option>
                      <option>周末</option>
                    </select>
                  </div>
                </div>
                
                <button className="mt-6 bg-[#4ECDC4] text-white px-6 py-3 rounded-full hover:bg-[#3eb8af] transition-colors font-medium">
                  保存提醒设置
                </button>
              </div>
              
              {/* 安全设置 */}
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333] flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#95E1D3]" />
                  安全设置
                </h3>
                <p className="text-[#666666] mb-4">
                  管理孩子的学习内容访问权限
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#333333]">内容过滤</div>
                      <div className="text-sm text-[#666666]">过滤不适宜的学习内容</div>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#4ECDC4] rounded-full transition before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#333333]">在线互动限制</div>
                      <div className="text-sm text-[#666666]">禁止与其他用户互动</div>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#4ECDC4] rounded-full transition before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;