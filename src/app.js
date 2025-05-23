// server/index.js
import express from 'express';
import cors from 'cors';

import devicesRouter from './routes/devicesRouter.js';
// import authRouter from './routes/authRouter.js'; 

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json());


// app.use('/api/auth', authRouter);
app.use('/api/devices', devicesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
