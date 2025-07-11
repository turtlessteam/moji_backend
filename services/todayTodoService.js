const { createClient } = require('@supabase/supabase-js');

const todayTodoService = async (userId, sort, limit, token) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  let query = supabase
    .from('todos')
    .select('id, taskTitle, taskDate, taskTime, isCheck, priorityRate') // ✅ 수정된 컬럼명
    .eq('userId', userId)
    .eq('taskDate', today)
    .limit(limit);

  if (sort === 'priority') {
    query = query.order('priorityRate', { ascending: true }); // ✅ 수정
  } else if (sort === 'latest') {
    query = query.order('taskTime', { ascending: false }); // ✅ 수정
  } else {
    throw new Error('sort는 priority 또는 latest만 허용됩니다.');
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const todo = data.filter(item => !item.isCheck);
  const finish = data.filter(item => item.isCheck);

  return { todo, finish };
};

module.exports = todayTodoService;
