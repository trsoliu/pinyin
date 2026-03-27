import React, { useState, useRef } from 'react';
import { Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('pinyin');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const audioContextRef = useRef(null);

  // 初始化音频上下文
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // 播放发音函数
  const playSound = async (text) => {
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
        'mā': 440, 'bàba': 220, 'mǐ': 330,
        '花': 523, '书': 392
      };
      
      if (frequencyMap[text]) {
        oscillator.frequency.value = frequencyMap[text];
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

  // 拼读练习数据
  const pinyinQuestions = [
    {
      id: 1,
      pinyin: "mā",
      options: ["妈", "吗", "麻", "骂"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=妈妈,人物&width=200&height=200&random=mama_200_200"
    },
    {
      id: 2,
      pinyin: "bàba",
      options: ["爸爸", "把把", "坝坝", "粑粑"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=爸爸,人物&width=200&height=200&random=baba_200_200"
    },
    {
      id: 3,
      pinyin: "mǐ",
      options: ["米", "密", "迷", "蜜"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=大米,食物&width=200&height=200&random=mi_200_200"
    }
  ];

  // 听音辨字数据
  const listeningQuestions = [
    {
      id: 1,
      word: "花",
      pinyin: "huā",
      options: ["huā", "huá", "huǎ", "huà"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=花朵,植物&width=200&height=200&random=hua_200_200"
    },
    {
      id: 2,
      word: "书",
      pinyin: "shū",
      options: ["sū", "shū", "shú", "shǔ"],
      correct: 1,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=书籍,学习&width=200&height=200&random=shu_200_200"
    }
  ];

  const questions = activeTab === 'pinyin' ? pinyinQuestions : listeningQuestions;
  const question = questions[currentQuestion];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    // 检查答案是否正确
    if (index === question.correct) {
      setScore(score + 1);
    }
    
    // 延迟进入下一题
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">拼音练习</h1>
      
      {/* 标签页切换 */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-md">
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'pinyin' 
                ? 'bg-[#FF6B35] text-white' 
                : 'text-[#666666] hover:text-[#FF6B35]'
            }`}
            onClick={() => {
              setActiveTab('pinyin');
              resetPractice();
            }}
          >
            拼读练习
          </button>
          <button 
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === 'listening' 
                ? 'bg-[#4ECDC4] text-white' 
                : 'text-[#666666] hover:text-[#4ECDC4]'
            }`}
            onClick={() => {
              setActiveTab('listening');
              resetPractice();
            }}
          >
            听音辨字
          </button>
        </div>
      </div>

      {/* 练习区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        {currentQuestion < questions.length ? (
          <div className="text-center">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">
                第 {currentQuestion + 1} 题 / 共 {questions.length} 题
              </span>
              <span className="bg-[#FFD93D] text-[#333333] px-3 py-1 rounded-full font-bold">
                得分: {score}
              </span>
            </div>

            {activeTab === 'pinyin' ? (
              // 拼读练习
              <div>
                <div className="mb-8">
                  <div className="text-5xl font-bold mb-4 text-[#FF6B35]">{question.pinyin}</div>
                  <button 
                    className="flex items-center justify-center mx-auto bg-[#4ECDC4] text-white px-4 py-2 rounded-full hover:bg-[#3eb8af] transition-colors"
                    onClick={() => playSound(question.pinyin)}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    播放发音
                  </button>
                </div>
                
                <div className="mb-6">
                  <img 
                    src={question.image} 
                    alt={question.pinyin} 
                    className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-md"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-4">请选择对应的汉字:</h3>
              </div>
            ) : (
              // 听音辨字
              <div>
                <div className="mb-8">
                  <img 
                    src={question.image} 
                    alt={question.word} 
                    className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-md mb-4"
                  />
                  <div className="text-5xl font-bold mb-4 text-[#4ECDC4]">{question.word}</div>
                  <button 
                    className="flex items-center justify-center mx-auto bg-[#FF6B35] text-white px-4 py-2 rounded-full hover:bg-[#e55a2b] transition-colors"
                    onClick={() => playSound(question.word)}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    播放词语
                  </button>
                </div>
                
                <h3 className="text-xl font-bold mb-4">请选择正确的拼音:</h3>
              </div>
            )}

            {/* 选项 */}
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-2xl text-lg font-medium transition-all ${
                    selectedAnswer === null 
                      ? 'bg-[#FFF8F0] hover:bg-[#FFD93D] hover:text-[#333333] border-2 border-[#FFD93D]' 
                      : index === question.correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : index === selectedAnswer
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-100 border-2 border-gray-200'
                  } ${
                    selectedAnswer !== null && index === question.correct ? 'animate-bounce' : ''
                  }`}
                  onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center justify-center">
                    {option}
                    {selectedAnswer !== null && index === question.correct && (
                      <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                    )}
                    {selectedAnswer !== null && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="w-6 h-6 text-red-500 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* 结果反馈 */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-2xl ${
                selectedAnswer === question.correct 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className="font-bold text-xl">
                  {selectedAnswer === question.correct ? '答对了！真棒！' : '答错了，再试试看！'}
                </div>
                <div className="mt-2">
                  正确答案是: {question.options[question.correct]}
                </div>
              </div>
            )}
          </div>
        ) : (
          // 练习完成
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold mb-4">练习完成！</h2>
            <p className="text-xl mb-6">
              你答对了 <span className="font-bold text-[#FF6B35]">{score}</span> 题，
              共 {questions.length} 题
            </p>
            <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
              <div 
                className="bg-[#4ECDC4] h-6 rounded-full flex items-center justify-center text-white font-bold"
                style={{width: `${(score / questions.length) * 100}%`}}
              >
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
            <button
              className="flex items-center justify-center mx-auto bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#e55a2b] transition-colors"
              onClick={resetPractice}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              再练一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;