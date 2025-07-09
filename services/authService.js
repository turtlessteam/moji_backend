const { getSupabaseToken } = require('../utils/generateToken');
const { getNicknameByUserId } = require('../utils/getNicknameByUserId');


async function login(userEmail, password) {
    console.log(userEmail, password);
    const userInfo = await getSupabaseToken(userEmail, password); //��ū, ���̵�, �̸��� ����
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

