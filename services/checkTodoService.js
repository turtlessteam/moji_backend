
const { createClient } = require('@supabase/supabase-js');

const checkTodoService = async (userId, taskId, token) => {
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

  // 1. 현재 isCheck 값 조회
  const { data: existing, error: getError } = await supabase
    .from('todos')
    .select('isCheck')
    .eq('id', taskId)
    .eq('userId', userId)
    .single();

  if (getError) throw new Error(getError.message);
  if (!existing) throw new Error('할 일을 찾을 수 없습니다.');

  const newIsCheck = !existing.isCheck;

  // 2. 값 반대로 업데이트
  const { data: updated, error: updateError } = await supabase
    .from('todos')
    .update({ isCheck: newIsCheck })
    .eq('id', taskId)
    .eq('userId', userId)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return updated;
};

module.exports = checkTodoService;
