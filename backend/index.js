import express from 'express';
import 'dotenv/config'
import connec from './conn/conn.js';  // Check this path!
import auth from './routes/auth.js'   // Check this path!
import cors from 'cors'

const app = express();

// CORS Configuration - MUST be before routes
const corsOptions = {
  origin: 'https://test-five-alpha-61.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Connect to database
connec();

// Body parser
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("helloo world")
});

app.use('/api', auth);

// Export for Vercel
export default app;