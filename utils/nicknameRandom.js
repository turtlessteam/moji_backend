import pkg from '../random-nickname/src/index.js';
import supabase from './supabaseClient.js';

const { getRandomNickname } = pkg;

const NICKNAME_TYPE = 'animals';
const GENERATE_COUNT = 20;

let nicknamePool = [];
let isRefilling = false;
let refillPromise = null;

/**
 * Supabase에서 이미 사용된 닉네임 목록 가져오기
 */
async function getUsedNicknamesFromDB() {
  const { data, error } = await supabase.from('nicknames').select('nickname');
  if (error) {
    console.error('닉네임 불러오기 실패:', error.message);
    return [];
  }
  return data.map(row => row.nickname);
}

/**
 * 닉네임 풀을 채우는 함수 (겹치는 닉네임 제외하고 정확히 20개 확보)
 */
async function refillNicknamePool() {
  if (isRefilling) {
    return refillPromise; // 이미 리필 중이면 같은 Promise 반환 (동시성 안전)
  }

  isRefilling = true;

  refillPromise = (async () => {
    const existingNicknames = new Set(await getUsedNicknamesFromDB());
    const result = new Set();

    // 겹치는 닉네임 제외하고 20개 확보될 때까지 생성 반복
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

/**
 * 닉네임 하나 반환 (풀에 5개 미만이면 자동 refill 요청)
 */
export async function getNickname() {
  if (nicknamePool.length < 5) {
    // refill을 요청하되, 바로 pop() 수행 가능
    refillNicknamePool();
  }

  if (nicknamePool.length === 0) {
    // 만약 드물게 refill 중인데 닉네임이 하나도 없으면 대기
    await refillPromise;
  }

  return nicknamePool.pop();
}

/**
 * 서버 시작 시 초기 풀 세팅
 */
export async function initNicknamePool() {
  await refillNicknamePool();
}
