// services/createSupabaseWithAuth.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// accessToken을 받아서 인증된 Supabase 인스턴스 생성
const createSupabaseWithAuth = (accessToken) =>
  createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

module.exports = createSupabaseWithAuth;
