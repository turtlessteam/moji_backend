const supabase = require('../services/supabaseClient');
const { createClient } = require('@supabase/supabase-js');
const { getNickname } = require('../utils/nicknameRandom');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.registerUser = async (userEmail, password) => {
  // 1. 회원가입 시도
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password
  });


  if (error || !data.user || !data.session) {
    throw new Error(error?.message || '회원가입 실패');
  }

  const id = data.user.id;
  const access_token = data.session.access_token;

  // 2. 닉네임 생성 시도
  let nickname;
  try {
    nickname = await getNickname();
  } catch (e) {
    throw new Error('닉네임 생성 중 오류 발생: ' + e.message);
  }

  // 3. access_token을 이용한 인증된 Supabase 클라이언트 생성
  const supabaseWithAuth = createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  });

  // 4. nicknames 테이블에 삽입
  const { error: insertError } = await supabaseWithAuth.from('nicknames').insert({
    userId: id,
    nickname,
  });

  if (insertError) {
    throw new Error('닉네임 저장 실패: ' + insertError.message);
  }

  // 5. 회원가입 성공 응답 반환
  return { access_token, id, nickname };
};
