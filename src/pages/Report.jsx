import React, { useState, useEffect } from 'react';
import { Award, Trophy, Target, Clock, RotateCcw, BarChart3 } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLearningRecords } from '../hooks/useLearningRecords';
import { useTestScores } from '../hooks/useTestScores';

const Report = () => {
  const { currentUser } = useCurrentUser();
  const { records, loading: recordsLoading } = useLearningRecords(currentUser?.id);
  const { scores, loading: scoresLoading, getAverageScore, getRecentTests } = useTestScores(currentUser?.id);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [learningData, setLearningData] = useState({
    totalLessons: 45, // 21 声母 + 24 韵母
    completedLessons: 0,
    totalTests: 0,
    averageScore: 0,
    totalTime: 0, // 分钟
    streak: 0 // 连续学习天数
  });

  // 计算学习数据
  useEffect(() => {
    if (records.length > 0 || scores.length > 0) {
      const completedLessons = records.filter(r => r.status === 'completed').length;
      const averageScore = getAverageScore();
      const totalTests = scores.length;
      
      setLearningData(prev => ({
        ...prev,
        completedLessons,
        averageScore,
        totalTests
      }));
    }
  }, [records, scores, getAverageScore]);

  // 模拟成就数据
  const achievements = [
    { id: 1, name: "初学者", description: "完成第一课学习", unlocked: false, date: null },
    { id: 2, name: "声母大师", description: "完成所有声母学习", unlocked: false, date: null },
    { id: 3, name: "韵母专家", description: "完成所有韵母学习", unlocked: false, date: null },
    { id: 4, name: "测试达人", description: "完成第一次测试", unlocked: false, date: null },
    { id: 5, name: "满分冠军", description: "测试获得满分", unlocked: false, date: null },
    { id: 6, name: "坚持不懈", description: "连续学习7天", unlocked: false, date: null }
  ];

  // 更新成就解锁状态
  const updatedAchievements = achievements.map(achievement => {
    // 根据实际学习数据更新成就状态
    switch (achievement.id) {
      case 1:
        return {
          ...achievement,
          unlocked: learningData.completedLessons > 0,
          date: learningData.completedLessons > 0 ? new Date().toISOString().split('T')[0] : null
        };
      case 2:
        const consonantsCompleted = records.filter(r => 
          r.pinyin_type === 'consonant' && r.status === 'completed'
        ).length;
        return {
          ...achievement,
          unlocked: consonantsCompleted >= 21,
          date: consonantsCompleted >= 21 ? new Date().toISOString().split('T')[0] : null
        };
      case 3:
        const vowelsCompleted = records.filter(r => 
          r.pinyin_type === 'vowel' && r.status === 'completed'
        ).length;
        return {
          ...achievement,
          unlocked: vowelsCompleted >= 24,
          date: vowelsCompleted >= 24 ? new Date().toISOString().split('T')[0] : null
        };
      case 4:
        return {
          ...achievement,
          unlocked: learningData.totalTests > 0,
          date: learningData.totalTests > 0 ? new Date().toISOString().split('T')[0] : null
        };
      case 5:
        return {
          ...achievement,
          unlocked: learningData.averageScore === 100,
          date: learningData.averageScore === 100 ? new Date().toISOString().split('T')[0] : null
        };
      default:
        return achievement;
    }
  });

  const getProgressPercentage = () => {
    return Math.round((learningData.completedLessons / learningData.totalLessons) * 100);
  };

  // 获取声母学习进度
  const getConsonantProgress = () => {
    const total = 21;
    const completed = records.filter(r => 
      r.pinyin_type === 'consonant' && r.status === 'completed'
    ).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  // 获取韵母学习进度
  const getVowelProgress = () => {
    const total = 24;
    const completed = records.filter(r => 
      r.pinyin_type === 'vowel' && r.status === 'completed'
    ).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  // 获取最近错题（模拟数据）
  const getWrongQuestions = () => {
    // 在实际应用中，这应该从数据库获取真实的错题记录
    return [];
  };

  // 如果用户未登录，显示提示信息
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">学习报告</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-xl text-[#666666] mb-6">请先登录以查看您的学习报告</p>
          <button 
            className="bg-[#FF6B35] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e55a2b] transition-colors"
            onClick={() => window.location.hash = '/login'}
          >
            去登录
          </button>
        </div>
      </div>
    );
  }

  // 显示加载状态
  if (recordsLoading || scoresLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">学习报告</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-xl text-[#666666]">正在加载学习数据...</p>
        </div>
      </div>
    );
  }

  const consonantProgress = getConsonantProgress();
  const vowelProgress = getVowelProgress();
  const wrongQuestions = getWrongQuestions();
  const recentTests = getRecentTests(5);

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
                <div className="text-3xl font-bold text-[#333333]">{learningData.totalTests}</div>
                <div className="text-[#666666]">测试次数</div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6 text-center border-2 border-[#95E1D3]">
                <Award className="w-12 h-12 text-[#95E1D3] mx-auto mb-4" />
                <div className="text-3xl font-bold text-[#333333]">{updatedAchievements.filter(a => a.unlocked).length}</div>
                <div className="text-[#666666]">已获得成就</div>
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
                  <span>{consonantProgress.completed}/{consonantProgress.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-[#4ECDC4] h-4 rounded-full" 
                    style={{width: `${consonantProgress.percentage}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="bg-[#FFF8F0] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#333333]">韵母学习进度</h3>
                <div className="flex justify-between mb-2">
                  <span>已完成</span>
                  <span>{vowelProgress.completed}/{vowelProgress.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-[#FFD93D] h-4 rounded-full" 
                    style={{width: `${vowelProgress.percentage}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* 最近测试 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#333333]">最近测试</h3>
              {recentTests.length > 0 ? (
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="border-2 border-[#4ECDC4] rounded-2xl p-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">测试 #{test.id}</div>
                        <div className="text-sm text-[#666666]">{new Date(test.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="text-lg font-bold text-[#FF6B35]">{test.score}/{test.total_questions}</div>
                        <div className="text-lg font-bold text-[#4ECDC4]">{test.correct_rate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#666666]">
                  暂无测试记录，去完成一次测试吧！
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
              {updatedAchievements.map((achievement) => (
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
            
            {scores.length > 0 ? (
              <div className="space-y-4">
                {scores.map((test) => (
                  <div key={test.id} className="border-2 border-[#4ECDC4] rounded-2xl p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-[#333333]">测试 #{test.id}</h3>
                      <div className="bg-[#4ECDC4] text-white px-3 py-1 rounded-full">
                        {new Date(test.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#FF6B35]">{test.score}/{test.total_questions}</div>
                        <div className="text-[#666666]">得分</div>
                      </div>
                      
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#4ECDC4]">{test.correct_rate}%</div>
                        <div className="text-[#666666]">正确率</div>
                      </div>
                      
                      <div className="bg-[#FFF8F0] rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#FFD93D]">{test.time_spent}秒</div>
                        <div className="text-[#666666]">用时</div>
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