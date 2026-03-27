import React, { useState, useRef } from 'react';
import { Volume2, Lock, CheckCircle } from 'lucide-react';

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
  const audioContextRef = useRef(null);

  // 初始化音频上下文
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // 播放发音函数
  const playSound = async (char) => {
    try {
      // 初始化音频上下文
      const audioContext = initAudioContext();
      
      // 如果是暂停状态，恢复播放
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // 创建 oscillator（振荡器）来生成声音
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // 连接节点
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 设置音调和音量
      oscillator.type = 'sine';
      oscillator.frequency.value = 440; // 默认频率
      gainNode.gain.value = 0.1; // 音量
      
      // 根据不同拼音设置不同频率（简化模拟）
      const frequencyMap = {
        'a': 440, 'o': 494, 'e': 523, 'i': 587, 'u': 659, 'ü': 698,
        'b': 220, 'p': 233, 'm': 247, 'f': 262, 'd': 294, 't': 330,
        'n': 349, 'l': 392, 'g': 415, 'k': 466, 'h': 494
      };
      
      if (frequencyMap[char]) {
        oscillator.frequency.value = frequencyMap[char];
      }
      
      // 播放声音
      oscillator.start();
      
      // 0.5秒后停止
      setTimeout(() => {
        oscillator.stop();
      }, 500);
    } catch (error) {
      console.error('播放音频时出错:', error);
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

      {/* 内容区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {activeTab === 'consonants' ? (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">声母 (21个)</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {consonants.map((item) => (
                <div 
                  key={item.id}
                  className={`${getStatusClass(item.status)} border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="text-3xl font-bold mb-2">{item.char}</div>
                  <div className="text-sm mb-2">{item.pronunciation}</div>
                  {getStatusIcon(item.status)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">韵母 (24个)</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {vowels.map((item) => (
                <div 
                  key={item.id}
                  className={`${getStatusClass(item.status)} border-2 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="text-3xl font-bold mb-2">{item.char}</div>
                  <div className="text-sm mb-2">{item.pronunciation}</div>
                  {getStatusIcon(item.status)}
                </div>
              ))}
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
                className="flex items-center justify-center mx-auto bg-[#4ECDC4] text-white px-6 py-3 rounded-full hover:bg-[#3eb8af] transition-colors"
                onClick={() => playSound(selectedItem.char)}
              >
                <Volume2 className="w-5 h-5 mr-2" />
                播放发音
              </button>
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