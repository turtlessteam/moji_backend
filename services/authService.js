const { getSupabaseToken } = require('../utils/generateToken');
const { getNicknameByUserId } = require('../utils/getNicknameByUserId');


async function login(email, password) {
    const userInfo = await getSupabaseToken(email, password); //��ū, ���̵�, �̸��� ����
    const access_token = userInfo.access_token;
    const id = userInfo.id;

    const nickname = await getNicknameByUserId(id, access_token);

    return {
        access_token,
        id,
        nickname
    };

}

module.exports = { login };

