const { createClient } = require('@supabase/supabase-js');


const uploadMemoService = async ({ userId, memoContent, priority, memoTitle, todo, token }) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // 1. memos 테이블에 삽입
  const { error: memoError } = await supabase
    .from('memos')
    .insert({
      userId,
      memoTitle,
      memoContent,
      priority
    });

  if (memoError) throw new Error(`Failed to insert into memos: ${memoError.message}`);

  // 2. 만약 todo가 있으면 todos 테이블에도 삽입
  if (todo) {
    const { taskTime, taskDate } = todo;

    const { error: todoError } = await supabase
      .from('todos')
      .insert({
        userId,
        taskTitle: memoTitle,
        taskContent: memoContent,
        taskTime,
        taskDate,
        priorityRate: priority,
        isCheck: false
      });

    if (todoError) throw new Error(`Failed to insert into todos: ${todoError.message}`);
  }
};

module.exports = uploadMemoService;
