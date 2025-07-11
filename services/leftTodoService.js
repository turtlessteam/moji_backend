const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const leftTodoService = async (userId, sort, limit, token) => {
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

  const today = new Date().toISOString().split('T')[0];

  // 공통 쿼리 빌더
  const buildQuery = (comparator) => {
    let query = supabase
      .from('todos')
      .select('id, taskTitle, taskDate, taskTime, isCheck, priorityRate')
      .eq('userId', userId)
      .filter('taskDate', comparator, today)
      .limit(limit);

    if (sort === 'priority') {
      query = query.order('priorityRate', { ascending: true });
    } else if (sort === 'latest') {
      query = query.order('taskTime', { ascending: false });
    } else {
      throw new Error('sort는 priority 또는 latest만 허용됩니다.');
    }

    return query;
  };

  // 각각 쿼리 실행
  const [pastResult, upcomingResult] = await Promise.all([
    buildQuery('lt').then(res => res.data),
    buildQuery('gt').then(res => res.data)
  ]);

  return {
    past: pastResult || [],
    upcoming: upcomingResult || []
  };
};

module.exports = leftTodoService;
