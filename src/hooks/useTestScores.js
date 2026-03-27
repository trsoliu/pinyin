import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const TABLE_NAME = 'test_scores_69564'

export const useTestScores = (userId) => {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchScores = useCallback(async () => {
    if (!userId) {
      setError('用户 ID 不能为空')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .order('test_date', { ascending: false })

      if (fetchError) throw fetchError
      setScores(data || [])
    } catch (err) {
      console.error('获取测试成绩失败:', err)
      setError(err.message || '获取测试成绩失败')
    } finally {
      setLoading(false)
    }
  }, [userId])

  const saveScore = useCallback(async (scoreData) => {
    if (!userId) {
      throw new Error('用户 ID 不能为空')
    }

    // 验证必填字段
    if (!scoreData.test_type) {
      throw new Error('测试类型不能为空')
    }
    if (scoreData.score === undefined || scoreData.score === null) {
      throw new Error('测试分数不能为空')
    }

    try {
      const record = {
        user_id: userId,
        test_type: scoreData.test_type,
        score: Number(scoreData.score),
        total_questions: scoreData.total_questions ? Number(scoreData.total_questions) : 0,
        correct_answers: scoreData.correct_answers ? Number(scoreData.correct_answers) : 0,
        accuracy_rate: scoreData.accuracy_rate ? Number(scoreData.accuracy_rate) : 0,
        time_taken: scoreData.time_taken ? Number(scoreData.time_taken) : 0,
        mistakes: scoreData.mistakes ? JSON.stringify(scoreData.mistakes) : '[]',
        feedback: scoreData.feedback || ''
      }

      const { data, error: insertError } = await supabase
        .from(TABLE_NAME)
        .insert([record])
        .select()

      if (insertError) {
        console.error('保存测试成绩失败:', insertError)
        throw insertError
      }

      return data[0]
    } catch (err) {
      console.error('保存测试成绩异常:', err)
      throw err
    }
  }, [userId])

  const getLatestScore = useCallback(async (testType) => {
    if (!userId) {
      return null
    }

    try {
      const { data, error: fetchError } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('user_id', userId)
        .eq('test_type', testType)
        .order('test_date', { ascending: false })
        .limit(1)

      if (fetchError) throw fetchError
      return data?.[0] || null
    } catch (err) {
      console.error('获取最新成绩失败:', err)
      return null
    }
  }, [userId])

  // 计算平均分
  const getAverageScore = useCallback(() => {
    if (!scores || scores.length === 0) {
      return 0
    }
    const total = scores.reduce((sum, score) => sum + (Number(score.score) || 0), 0)
    return Math.round(total / scores.length)
  }, [scores])

  // 获取最近的测试记录
  const getRecentTests = useCallback((limit = 3) => {
    if (!scores || scores.length === 0) {
      return []
    }
    return scores.slice(0, limit).map(score => ({
      id: score.id,
      type: score.test_type,
      score: score.score,
      date: new Date(score.test_date).toLocaleDateString('zh-CN'),
      accuracy: score.accuracy_rate
    }))
  }, [scores])

  useEffect(() => {
    if (userId) {
      fetchScores()
    }
  }, [userId])

  return {
    scores,
    loading,
    error,
    fetchScores,
    saveScore,
    getLatestScore,
    getAverageScore,
    getRecentTests
  }
}