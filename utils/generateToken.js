//npm install axios �� ��
require('dotenv').config();
const axios = require('axios');


const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_KEY;


async function getSupabaseToken(email, password) { //���ڴ� ��� ���ڿ��� �ѱ��
    try {
        const response = await axios.post(
            `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
            {
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_API_KEY
                }
            }
        );

        const { access_token, user } = response.data;
        const id = user?.id;
        const emailReturned = user?.email;

        return {
            access_token,
            id,
            email:emailReturned
        };

    } catch (error) {
        console.error('Supabase generate token 중 오류발생:', error.response?.data || error.message);
        throw new Error('Supabase generate token 중 오류발생');
    }
}

module.exports = { getSupabaseToken };

