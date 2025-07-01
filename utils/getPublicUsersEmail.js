require('dotenv').config();
const axios = require('axios');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

async function getPublicUsersEmail(email) {
  try {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/publicUsers`, {
      headers: {
        apikey: SUPABASE_API_KEY, 
      },
      params: {
        email: `eq.${email}`,
        select: 'email',
      },
    });

    return response.data.length > 0;
  } catch (error) {
    console.error('Error checking email:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getPublicUsersEmail };
