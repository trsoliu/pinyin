import React, { useState, useRef } from 'react';
import { Volume2, Lock, CheckCircle } from 'lucide-react';
import { useLearningRecords } from '../hooks/useLearningRecords';
import { useCurrentUser } from '../hooks/useCurrentUser';

const Learning = () => {
  // 声母数据
  const initialConsonants = [
    { id: 1, char: 'b', pronunciation: '波', status: 'completed' },
    { id: 2, char: 'p', pronunciation: '泼', status: 'completed' },
    { id: 3, char: 'm', pronunciation: '摸', status: 'completed' },
    { id: 4, char: 'f', pronunciation: '佛', status: 'completed' },
    { id: 5, char: 'd', pronunciation: '得', status: 'completed' },
    { id: 6, char: 't', pronunciation: '特', status: 'completed' },
    { id: 7, char: 'n', pronunciation: '讷', status: 'completed' },
    { id: 8, char: 'l', pronunciation: '勒', status: 'completed' },
    { id: 9, char: 'g', pronunciation: '哥', status: 'locked' },
    { id: 10, char: 'k', pronunciation: '科', status: 'locked' },
    { id: 11, char: 'h', pronunciation: '喝', status: 'locked' },
    { id: 12, char: 'j', pronunciation: '基', status: 'locked' },
    { id: 13, char: 'q', pronunciation: '欺', status: 'locked' },
    { id: 14, char: 'x', pronunciation: '希', status: 'locked' },
    { id: 15, char: 'zh', pronunciation: '知', status: 'locked' },
    { id: 16, char: 'ch', pronunciation: '吃', status: 'locked' },
    { id: 17, char: 'sh', pronunciation: '诗', status: 'locked' },
    { id: 18, char: 'r', pronunciation: '日', status: 'locked' },
    { id: 19, char: 'z', pronunciation: '资', status: 'locked' },
    { id: 20, char: 'c', pronunciation: '雌', status: 'locked' },
    { id: 21, char: 's', pronunciation: '思', status: 'locked' }
  ];

  // 韵母数据
  const initialVowels = [
    { id: 1, char: 'a', pronunciation: '啊', status: 'completed' },
    { id: 2, char: 'o', pronunciation: '喔', status: 'completed' },
    { id: 3, char: 'e', pronunciation: '鹅', status: 'completed' },
    { id: 4, char: 'i', pronunciation: '衣', status: 'completed' },
    { id: 5, char: 'u', pronunciation: '乌', status: 'completed' },
    { id: 6, char: 'ü', pronunciation: '迂', status: 'locked' },
    { id: 7, char: 'ai', pronunciation: '哀', status: 'locked' },
    { id: 8, char: 'ei', pronunciation: '诶', status: 'locked' },
    { id: 9, char: 'ui', pronunciation: '威', status: 'locked' },
    { id: 10, char: 'ao', pronunciation: '奥', status: 'locked' },
    { id: 11, char: 'ou', pronunciation: '欧', status: 'locked' },
    { id: 12, char: 'iu', pronunciation: '优', status: 'locked' },
    { id: 13, char: 'ie', pronunciation: '耶', status: 'locked' },
    { id: 14, char: 'üe', pronunciation: '约', status: 'locked' },
    { id: 15, char: 'er', pronunciation: '儿', status: 'locked' },
    { id: 16, char: 'an', pronunciation: '安', status: 'locked' },
    { id: 17, char: 'en', pronunciation: '恩', status: 'locked' },
    { id: 18, char: 'in', pronunciation: '因', status: 'locked' },
    { id: 19, char: 'un', pronunciation: '温', status: 'locked' },
    { id: 20, char: 'ün', pronunciation: '晕', status: 'locked' },
    { id: 21, char: 'ang', pronunciation: '昂', status: 'locked' },
    { id: 22, char: 'eng', pronunciation: '鞥', status: 'locked' },
    { id: 23, char: 'ing', pronunciation: '英', status: 'locked' },
    { id: 24, char: 'ong', pronunciation: '轰', status: 'locked' }
  ];

  const [activeTab, setActiveTab] = useState('consonants');
  const [consonants] = useState(initialConsonants);
  const [vowels] = useState(initialVowels);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 获取当前用户
  const { currentUser } = useCurrentUser();
  
  // 使用 Supabase Hook
  const { records, updateRecord, loading, error } = useLearningRecords(currentUser?.id);

  // 播放发音函数 - 使用 SpeechSynthesis API
  const playSound = (char) => {
    // 检查浏览器是否支持 SpeechSynthesis API
    if ('speechSynthesis' in window) {
      // 取消之前的发音
      window.speechSynthesis.cancel();
      
      // 创建发音实例
      const utterance = new SpeechSynthesisUtterance(char);
      
      // 设置语言为中文
      utterance.lang = 'zh-CN';
      
      // 设置语速（稍慢，适合儿童学习）
      utterance.rate = 0.8;
      
      // 设置音调
      utterance.pitch = 1.0;
      
      // 设置音量
      utterance.volume = 1.0;
      
      // 开始发音
      setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('发音出错:', event);
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('您的浏览器不支持发音功能，请使用现代浏览器（如 Chrome、Edge、Safari 等）');
    }
  };

  // 更新学习进度
  const handleComplete = async (item, type) => {
    if (isSaving || loading) return;
    if (!currentUser) {
      alert('请先登录');
      return;
    }
    
    setIsSaving(true);
    try {
      await updateRecord(type, item.char, 'completed');
    } catch (err) {
      console.error('保存学习进度失败:', err);
      alert('保存学习进度失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (status === 'locked') {
      return <Lock className="w-6 h-6 text-gray-400" />;
    }
    return null;
  };

  const getStatusClass = (status) => {
    if (status === 'completed') {
      return 'bg-[#95E1D3] border-[#4ECDC4]';
    } else if (status === 'locked') {
      return 'bg-gray-200 border-gray-300';
    }
    return 'bg-white border-[#FFD93D]';
  };

  // 如果用户未登录，显示提示信息
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">拼音学习</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-xl text-[#666666] mb-6">请先登录以查看您的学习进度</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">拼音学习</h1>
      
      {/* 标签页切换 */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-md">
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'consonants' 
                ? 'bg-[#FF6B35] text-white' 
                : 'text-[#666666] hover:text-[#FF6B35]'
            }`}
            onClick={() => setActiveTab('consonants')}
          >
            声母学习
          </button>
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'vowels' 
                ? 'bg-[#4ECDC4] text-white' 
                : 'text-[#666666] hover:text-[#4ECDC4]'
            }`}
            onClick={() => setActiveTab('vowels')}
          >
            韵母学习
          </button>
        </div>
      </div>

      {/* 加载和错误提示 */}
      {loading && (
        <div className="text-center text-[#666666] mb-4">
          正在加载学习进度...
        </div>
      )}
      
      {error && (
        <div className="text-center text-[#FF6B6B] mb-4">
          {error}
          <button 
            className="ml-2 text-[#4ECDC4] underline"
            onClick={() => window.location.reload()}
          >
            重试
          </button>
        </div>
      )}

      {/* 内容区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {activeTab === 'consonants' ? (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">声母 (21 个)</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {consonants.map((item) => {
                const record = records.find(r => r.pinyin_char === item.char && r.pinyin_type === 'consonant');
                const status = record ? record.status : item.status;
                
                return (
                  <div 
                    key={item.id}
                    className={`${getStatusClass(status)} border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105`}
                    onClick={() => {
                      setSelectedItem({...item, status});
                      if (status === 'completed') {
                        playSound(item.char);
                      }
                    }}
                  >
                    <div className="text-3xl font-bold mb-2">{item.char}</div>
                    <div className="text-sm mb-2">{item.pronunciation}</div>
                    {getStatusIcon(status)}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">韵母 (24 个)</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {vowels.map((item) => {
                const record = records.find(r => r.pinyin_char === item.char && r.pinyin_type === 'vowel');
                const status = record ? record.status : item.status;
                
                return (
                  <div 
                    key={item.id}
                    className={`${getStatusClass(status)} border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105`}
                    onClick={() => {
                      setSelectedItem({...item, status});
                      if (status === 'completed') {
                        playSound(item.char);
                      }
                    }}
                  >
                    <div className="text-3xl font-bold mb-2">{item.char}</div>
                    <div className="text-sm mb-2">{item.pronunciation}</div>
                    {getStatusIcon(status)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">拼音详情</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedItem(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="text-center py-6">
              <div className="text-6xl font-bold mb-4">{selectedItem.char}</div>
              <div className="text-2xl mb-6">{selectedItem.pronunciation}</div>
              
              <button 
                className={`flex items-center justify-center mx-auto ${
                  isPlaying ? 'bg-[#3eb8af]' : 'bg-[#4ECDC4]'
                } text-white px-6 py-3 rounded-full hover:bg-[#3eb8af] transition-colors`}
                onClick={() => playSound(selectedItem.char)}
                disabled={isPlaying}
              >
                <Volume2 className={`w-5 h-5 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? '正在播放...' : '播放发音'}
              </button>

              {selectedItem.status !== 'completed' && (
                <button
                  className={`mt-4 flex items-center justify-center mx-auto bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#e55a2b] transition-colors disabled:opacity-50`}
                  onClick={() => handleComplete(selectedItem, activeTab === 'consonants' ? 'consonant' : 'vowel')}
                  disabled={isSaving || loading}
                >
                  {isSaving ? '保存中...' : '标记为已学会'}
                </button>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold mb-2">学习提示:</h4>
              <p className="text-sm">
                {selectedItem.char === 'b' && '双唇音，发音时双唇紧闭，然后突然打开，气流冲出。'}
                {selectedItem.char === 'p' && '双唇音，发音时双唇紧闭，然后突然打开，气流冲出，比"b"更强。'}
                {selectedItem.char === 'a' && '开口音，发音时嘴巴张大，舌头放平。'}
                {selectedItem.char === 'o' && '圆唇音，发音时嘴巴圆起，舌头后缩。'}
                {!['b', 'p', 'a', 'o'].includes(selectedItem.char) && '这是基础拼音，多练习几遍就能掌握！'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;