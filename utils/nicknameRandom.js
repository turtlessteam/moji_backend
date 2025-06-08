import pkg from './random-nickname/src/index.js'; 
const { getRandomNickname } = pkg;

const type = 'animals';
const count = 20;


function getMultipleRandomNicknames(type, count) {
  const nicknames = [];
  for (let i = 0; i < count; i++) {
    nicknames.push(getRandomNickname(type));
  }
  return nicknames;
}

const randomNickname = getMultipleRandomNicknames(type, count);

console.log(randomNickname);

/* 이후에 집합 이용할 것
const randomNicknames = new Set([
  '멋진 사자', '귀여운 호랑이', '용감한 토끼', '영리한 올빼미', '뚱뚱한 여우',
]);

const usedNicknames = new Set([
  '귀여운 호랑이', '뚱뚱한 여우',
]);

// 차집합 만들기 → 아직 안 쓰인 닉네임만 추출
const availableNicknames = new Set(
  [...randomNicknames].filter(name => !usedNicknames.has(name))
);

console.log(availableNicknames);
// Set(3) { '멋진 사자', '용감한 토끼', '영리한 올빼미' }


*/