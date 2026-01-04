import express from 'express';
import 'dotenv/config'
import connec from './conn/conn.js';
import auth from './routes/auth.js'
import cors from 'cors'

connec();

const app=express();
const port=3000;

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
  res.send("helloo world")
})

app.use('/api',auth);

app.listen(port,()=>{
  console.log(`listening at port ${3000}`)
})