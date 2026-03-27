import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useLearningRecords = (userId) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    if (!userId) {
      setRecords([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('learning_records_69564')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setRecords(data || []);
    } catch (err) {
      console.error('获取学习记录失败:', err);
      setError('获取学习记录失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateRecord = useCallback(async (pinyinType, pinyinChar, status) => {
    if (!userId) {
      throw new Error('用户未登录');
    }

    try {
      // 先查询是否已存在记录
      const { data: existingRecord } = await supabase
        .from('learning_records_69564')
        .select('id, practice_count')
        .eq('user_id', userId)
        .eq('pinyin_type', pinyinType)
        .eq('pinyin_char', pinyinChar)
        .single();

      if (existingRecord) {
        // 更新现有记录
        const updateData = {
          status,
          practice_count: existingRecord.practice_count + 1,
          updated_at: new Date().toISOString()
        };

        if (status === 'completed' && !existingRecord.learned_at) {
          updateData.learned_at = new Date().toISOString();
        }

        const { data, error: updateError } = await supabase
          .from('learning_records_69564')
          .update(updateData)
          .eq('id', existingRecord.id)
          .select()
          .single();

        if (updateError) {
          throw updateError;
        }

        // 更新本地状态
        setRecords(prev => prev.map(r => r.id === existingRecord.id ? data : r));
        return data;
      } else {
        // 创建新记录
        const insertData = {
          user_id: userId,
          pinyin_type: pinyinType,
          pinyin_char: pinyinChar,
          status,
          practice_count: 1
        };

        if (status === 'completed') {
          insertData.learned_at = new Date().toISOString();
        }

        const { data, error: insertError } = await supabase
          .from('learning_records_69564')
          .insert([insertData])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        // 更新本地状态
        setRecords(prev => [...prev, data]);
        return data;
      }
    } catch (err) {
      console.error('更新学习记录失败:', err);
      setError('更新学习记录失败，请重试');
      throw err;
    }
  }, [userId]);

  const getProgress = useCallback(() => {
    const completed = records.filter(r => r.status === 'completed').length;
    const total = records.length || 45; // 21 声母 + 24 韵母
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  }, [records]);

  useEffect(() => {
    if (userId) {
      fetchRecords();
    }
  }, [userId]);

  return {
    records,
    loading,
    error,
    updateRecord,
    getProgress,
    refetch: fetchRecords
  };
};