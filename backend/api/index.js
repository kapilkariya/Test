import express from 'express';
import 'dotenv/config'
import connec from '../conn/conn.js';
import auth from '../routes/auth.js'
import cors from 'cors'

// 1. First create the app
const app = express();

// 2. Then configure CORS
const corsOptions = {
  origin: [
    'https://test-nine-black-40.vercel.app',  // Your Vercel domain
    'http://localhost:3000',                   // For local development
    'http://localhost:5173'                    // If using Vite locally
  ],
  credentials: true,  // If you're using cookies/sessions
  optionsSuccessStatus: 200
};

// 3. Connect to database
connec();

// 4. Use CORS only once
app.use(cors(corsOptions));

// 5. Other middleware
app.use(express.json());

// 6. Routes
app.get('/', (req, res) => {
  res.send("helloo world")
});

app.use('/api', auth);

// 7. Start server
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
});