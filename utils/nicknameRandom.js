const pkg = require('./random-nickname/src/index.js');
const supabase = require('../services/supabaseClient.js');
const { getRandomNickname } = pkg;

const NICKNAME_TYPE = 'animals';
const GENERATE_COUNT = 20;

let nicknamePool = [];
let isRefilling = false;
let refillPromise = null;

async function getUsedNicknamesFromDB() {
  const { data, error } = await supabase.from('nicknames').select('nickname');
  if (error) {
    console.error('닉네임 불러오기 실패:', error.message);
    return [];
  }
  return data.map(row => row.nickname);
}

async function refillNicknamePool() {
  if (isRefilling) return refillPromise;

  isRefilling = true;
  refillPromise = (async () => {
    const existingNicknames = new Set(await getUsedNicknamesFromDB());
    const result = new Set();

    while (result.size < GENERATE_COUNT) {
      const candidate = getRandomNickname(NICKNAME_TYPE);
      if (!existingNicknames.has(candidate) && !result.has(candidate)) {
        result.add(candidate);
      }
    }

    nicknamePool = [...result];
    console.log(`[닉네임] 풀 재생성 완료 (${nicknamePool.length}개 사용 가능)`);
    isRefilling = false;
  })();

  return refillPromise;
}

async function getNickname() {
  if (nicknamePool.length < 5) {
    refillNicknamePool();
  }

  if (nicknamePool.length === 0) {
    await refillPromise;
  }

  return nicknamePool.pop();
}

async function initNicknamePool() {
  await refillNicknamePool();
}

module.exports = {
  getNickname
};
