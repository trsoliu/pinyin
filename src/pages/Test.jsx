import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle, XCircle, RotateCcw, Timer } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useTestScores } from '../hooks/useTestScores';

const Test = () => {
  const { currentUser } = useCurrentUser();
  const { addScore } = useTestScores();
  
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5分钟
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 测试题目数据
  const questions = [
    {
      id: 1,
      type: "pinyin",
      question: "选择正确的拼音",
      word: "花",
      options: ["huā", "huá", "huǎ", "huà"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=花朵,植物&width=150&height=150&random=hua_test_150_150"
    },
    {
      id: 2,
      type: "character",
      question: "选择对应的汉字",
      pinyin: "māma",
      options: ["妈妈", "吗吗", "麻麻", "骂骂"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=妈妈,人物&width=150&height=150&random=mama_test_150_150"
    },
    {
      id: 3,
      type: "tone",
      question: "选择正确的声调",
      pinyin: "ma",
      options: ["mā (第一声)", "má (第二声)", "mǎ (第三声)", "mà (第四声)"],
      correct: 1, // 妈妈的"妈"是第二声
      context: "在词语'妈妈'中，'妈'的声调是？"
    },
    {
      id: 4,
      type: "pinyin",
      question: "选择正确的拼音",
      word: "书",
      options: ["sū", "shū", "shú", "shǔ"],
      correct: 1,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=书籍,学习&width=150&height=150&random=shu_test_150_150"
    },
    {
      id: 5,
      type: "character",
      question: "选择对应的汉字",
      pinyin: "kāfēi",
      options: ["咖啡", "喀啡", "卡非", "咖飞"],
      correct: 0,
      image: "https://www.weavefox.cn/api/bolt/unsplash_image?keyword=咖啡,饮品&width=150&height=150&random=kafei_test_150_150"
    }
  ];

  const question = questions[currentQuestion];

  // 倒计时效果
  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !testCompleted) {
      finishTest();
    }
    return () => clearTimeout(timer);
  }, [testStarted, timeLeft, testCompleted]);

  const startTest = () => {
    setTestStarted(true);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    // 记录答案
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: question.id,
      selected: index,
      correct: index === question.correct
    };
    setAnswers(newAnswers);
    
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
      } else {
        finishTest();
      }
    }, 1500);
  };

  const finishTest = async () => {
    setTestCompleted(true);
    
    // 保存测试成绩到数据库
    if (currentUser) {
      try {
        setIsSaving(true);
        const testData = {
          user_id: currentUser.id,
          score: score,
          total_questions: questions.length,
          correct_rate: Math.round((score / questions.length) * 100),
          time_spent: 300 - timeLeft,
          answers: answers
        };
        
        await addScore(testData);
      } catch (err) {
        console.error('保存测试成绩失败:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setTimeLeft(300);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setTestCompleted(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = (text) => {
    // 模拟播放发音
    console.log(`播放发音: ${text}`);
  };

  // 如果用户未登录，显示提示信息
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">拼音测试</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-xl text-[#666666] mb-6">请先登录以保存您的测试成绩</p>
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
      <h1 className="text-3xl font-bold text-[#333333] mb-8 text-center">拼音测试</h1>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
        {!testStarted ? (
          // 测试开始前的说明
          <div className="text-center py-8">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4">阶段测试</h2>
            <p className="text-lg mb-2">测试包含 {questions.length} 道题目</p>
            <p className="text-lg mb-6">限时 5 分钟完成</p>
            
            <div className="bg-[#FFF8F0] rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-xl font-bold mb-4 text-[#FF6B35]">测试说明:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>测试包含声母、韵母、声调等综合题目</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>每题选择一个正确答案</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>时间到或答完所有题目后自动提交</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>提交后可查看成绩和错题解析</span>
                </li>
              </ul>
            </div>
            
            <button
              className="bg-[#FF6B35] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-[#e55a2b] transition-colors shadow-lg"
              onClick={startTest}
            >
              开始测试
            </button>
          </div>
        ) : !testCompleted ? (
          // 测试进行中
          <div className="text-center">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">
                第 {currentQuestion + 1} 题 / 共 {questions.length} 题
              </span>
              <div className="flex items-center bg-[#FFD93D] text-[#333333] px-4 py-2 rounded-full font-bold">
                <Timer className="w-5 h-5 mr-2" />
                {formatTime(timeLeft)}
              </div>
              <span className="bg-[#4ECDC4] text-white px-3 py-1 rounded-full font-bold">
                得分: {score}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#333333]">{question.question}</h3>
              
              {question.type === "character" && (
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-4 text-[#FF6B35]">{question.pinyin}</div>
                  <button 
                    className="flex items-center justify-center mx-auto bg-[#4ECDC4] text-white px-4 py-2 rounded-full hover:bg-[#3eb8af] transition-colors"
                    onClick={() => playSound(question.pinyin)}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    播放发音
                  </button>
                </div>
              )}
              
              {question.type === "pinyin" && (
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-4 text-[#4ECDC4]">{question.word}</div>
                  <button 
                    className="flex items-center justify-center mx-auto bg-[#FF6B35] text-white px-4 py-2 rounded-full hover:bg-[#e55a2b] transition-colors"
                    onClick={() => playSound(question.word)}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    播放词语
                  </button>
                </div>
              )}
              
              {question.image && (
                <div className="mb-6">
                  <img 
                    src={question.image} 
                    alt={question.type === "character" ? question.pinyin : question.word} 
                    className="w-40 h-40 mx-auto rounded-2xl object-cover shadow-md"
                  />
                </div>
              )}
              
              {question.context && (
                <div className="text-lg mb-4 text-[#666666]">{question.context}</div>
              )}
            </div>

            {/* 选项 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {selectedAnswer === question.correct ? '答对了！真棒！' : '答错了，再仔细想想！'}
                </div>
                <div className="mt-2">
                  正确答案是: {question.options[question.correct]}
                </div>
              </div>
            )}
          </div>
        ) : (
          // 测试完成
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold mb-4">测试完成！</h2>
            <p className="text-xl mb-2">
              你的得分: <span className="font-bold text-[#FF6B35]">{score}</span> / {questions.length}
            </p>
            <p className="text-lg mb-6">
              正确率: <span className="font-bold">{Math.round((score / questions.length) * 100)}%</span>
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-6 mb-8">
              <div 
                className="bg-[#4ECDC4] h-6 rounded-full flex items-center justify-center text-white font-bold"
                style={{width: `${(score / questions.length) * 100}%`}}
              >
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {answers.map((answer, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl flex flex-col items-center ${
                    answer.correct ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <div className="text-lg font-bold mb-2">第{index + 1}题</div>
                  {answer.correct ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                className="flex items-center justify-center bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#e55a2b] transition-colors"
                onClick={resetTest}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                重新测试
              </button>
              <button
                className="flex items-center justify-center bg-[#4ECDC4] text-white px-6 py-3 rounded-full hover:bg-[#3eb8af] transition-colors"
                onClick={() => window.location.hash = '/report'}
              >
                查看报告
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;