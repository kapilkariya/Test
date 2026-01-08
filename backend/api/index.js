import express from 'express';
import 'dotenv/config'
import connec from '../conn/conn.js';
import auth from '../routes/auth.js'
import cors from 'cors'
const corsOptions = {
  origin: [
    'https://test-nine-black-40.vercel.app',  // Your Vercel domain
    'http://localhost:3000',                   // For local development
    'http://localhost:5173'                    // If using Vite locally
  ],
  credentials: true,  // If you're using cookies/sessions
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))a;
connec();

const app=express();
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
  res.send("helloo world")
})

app.use('/api',auth);

export default app;
// app.listen(3000, () => {
//   console.log(`Example app listening on port 3000`)
// })