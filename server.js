require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const isSameRoutes = require('./routes/isSameRoutes');
const getMemoRoutes = require('./routes/getMemoRoutes');
//const supabase = require('./services/supabaseClient');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); //json 파싱

//라우터 등록

app.use('/onboard', authRoutes);
app.use('/onboard', registerRoutes);
app.use('/onboard', isSameRoutes);
app.use('/memo', getMemoRoutes);
app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
  res.send('✅ 서버 작동 중!');
});


//test code
app.get('/test', async (req, res) => {
  const { data, error } = await supabase.from('nicknames').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


app.listen(port, () => {
  console.log(`🚀 서버가 실행되었습니다: http://localhost:${port}`);
});
