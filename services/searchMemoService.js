const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const searchMemoService = async (userId, keyword, token) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ RLS용
        },
      },
    }
  );

  // 1단계: memoTitle에서 검색
  let { data, error } = await supabase
    .from('memos')
    .select('id, memoTitle, memoContent, memoTime, memoDate, priority')
    .ilike('memoTitle', `%${keyword}%`);

  if (error) throw new Error(error.message);

  // 2단계: 없으면 memoContent에서 검색
  if (!data || data.length === 0) {
    const fallback = await supabase
      .from('memos')
      .select('id, memoTitle, memoContent, memoTime, memoDate, priority')
      .ilike('memoContent', `%${keyword}%`);

    if (fallback.error) throw new Error(fallback.error.message);
    return fallback.data;
  }

  return data;
};

module.exports = searchMemoService;
