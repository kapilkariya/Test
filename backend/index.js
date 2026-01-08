import express from 'express';
import 'dotenv/config'
import connec from './conn/conn.js';
import auth from './routes/auth.js'
import cors from 'cors'

// 1. Create app FIRST
const app = express();

// 2. Configure CORS with CORRECT frontend URL
const corsOptions = {
  origin: [
    'https://test-five-alpha-61.vercel.app',  // ← YOUR ACTUAL FRONTEND URL (was wrong!)
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// 3. Connect to database
connec();

// 4. Use CORS (only once!)
app.use(cors(corsOptions));

// 5. Body parser
app.use(express.json());

// 6. Routes
app.get('/', (req, res) => {
  res.send("helloo world")
});

app.use('/api', auth);

// 7. Export for Vercel
export default app;