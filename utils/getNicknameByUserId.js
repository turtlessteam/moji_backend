require('dotenv').config();
const axios = require('axios');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const getNicknameByUserId = async (userId, accessToken) => {
    try {
        const response = await axios.get(
            `${SUPABASE_URL}/rest/v1/nicknames?userId=eq.${userId}`,
            {
                headers: {
                    'apikey': SUPABASE_API_KEY,
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );
        data = response.data;
        return data[0].nickname;
    } catch (error) {
        console.error('Supabase 닉네임 불러오기 실패:', error.response?.data || error.message);
        throw new Error('Supabase 닉네임 불러오기 실패');
    }
};

module.exports = { getNicknameByUserId };

