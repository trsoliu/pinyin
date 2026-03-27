import { supabase } from './supabase';

/**
 * 初始化测试数据
 * 这只是一个辅助工具函数，用于创建测试用户
 * 实际应用中应该通过注册流程创建用户
 */

// 测试用户 ID（用于开发的模拟 UUID）
const TEST_USER_ID = '550e8400-e29b-41d4-a716-446655440001';

/**
 * 创建测试用户
 */
export const createTestUser = async () => {
  try {
    // 先检查用户是否已存在
    const { data: existingUser } = await supabase
      .from('users_69564')
      .select('id')
      .eq('id', TEST_USER_ID)
      .single();

    if (existingUser) {
      console.log('测试用户已存在');
      return existingUser;
    }

    // 创建测试用户
    const { data, error } = await supabase
      .from('users_69564')
      .insert([
        {
          id: TEST_USER_ID,
          email: 'test@example.com',
          name: '小明',
          role: 'child',
          age: 7,
          avatar_url: 'https://www.weavefox.cn/api/bolt/unsplash_image?keyword=儿童，头像&width=100&height=100&random=test_avatar_100_100'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('创建测试用户失败:', error);
      throw error;
    }

    console.log('测试用户创建成功:', data);
    return data;
  } catch (error) {
    console.error('初始化测试用户出错:', error);
    throw error;
  }
};

/**
 * 初始化一些测试学习记录
 */
export const initTestLearningRecords = async (userId) => {
  try {
    // 声母数据
    const consonants = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l'];
    // 韵母数据
    const vowels = ['a', 'o', 'e', 'i', 'u'];

    const records = [];

    // 添加声母记录
    for (const char of consonants) {
      records.push({
        user_id: userId,
        pinyin_type: 'consonant',
        pinyin_char: char,
        status: 'completed',
        practice_count: 5
      });
    }

    // 添加韵母记录
    for (const char of vowels) {
      records.push({
        user_id: userId,
        pinyin_type: 'vowel',
        pinyin_char: char,
        status: 'completed',
        practice_count: 5
      });
    }

    // 批量插入
    const { data, error } = await supabase
      .from('learning_records_69564')
      .insert(records)
      .select();

    if (error) {
      console.error('初始化学习记录失败:', error);
      throw error;
    }

    console.log('初始化学习记录成功:', data.length, '条');
    return data;
  } catch (error) {
    console.error('初始化学习记录出错:', error);
    throw error;
  }
};

/**
 * 初始化一些测试成绩
 */
export const initTestScores = async (userId) => {
  try {
    const scores = [
      {
        user_id: userId,
        test_type: 'consonant',
        score: 85,
        total_questions: 20,
        correct_answers: 17,
        duration_seconds: 180
      },
      {
        user_id: userId,
        test_type: 'vowel',
        score: 90,
        total_questions: 20,
        correct_answers: 18,
        duration_seconds: 150
      },
      {
        user_id: userId,
        test_type: 'comprehensive',
        score: 78,
        total_questions: 30,
        correct_answers: 23,
        duration_seconds: 300
      }
    ];

    const { data, error } = await supabase
      .from('test_scores_69564')
      .insert(scores)
      .select();

    if (error) {
      console.error('初始化测试成绩失败:', error);
      throw error;
    }

    console.log('初始化测试成绩成功:', data.length, '条');
    return data;
  } catch (error) {
    console.error('初始化测试成绩出错:', error);
    throw error;
  }
};

/**
 * 完整初始化（创建用户 + 学习记录 + 测试成绩）
 */
export const initAllTestData = async () => {
  try {
    console.log('开始初始化测试数据...');
    
    const user = await createTestUser();
    console.log('✓ 测试用户创建成功');
    
    await initTestLearningRecords(user.id);
    console.log('✓ 学习记录初始化成功');
    
    await initTestScores(user.id);
    console.log('✓ 测试成绩初始化成功');
    
    console.log('测试数据初始化完成！');
    return user;
  } catch (error) {
    console.error('初始化失败:', error);
    throw error;
  }
};

export { TEST_USER_ID };