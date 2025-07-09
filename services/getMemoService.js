const { createClient } = require('@supabase/supabase-js');

const getMemoService = async (userId, limit, sort, token) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Supabase RLS 통과용
      },
    },
  });

  let query = supabase
    .from('memos')
    .select('"id", "memoTitle", "memoContent", "memoTime", "memoDate", "priority"')
    .eq('userId', userId)
    .limit(limit);

  if (sort === 'priority') {
    query = query.order('priority', { ascending: true });
  } else if (sort === 'latest') {
    query = query
      .order('"memoDate"', { ascending: false })
      .order('"memoTime"', { ascending: false });
  } else {
    throw new Error('Invalid sort option');
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

module.exports = getMemoService;
