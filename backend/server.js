import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import supabase from './supabaseClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Supabase URL or Key missing in .env file');
  process.exit(1); 
}


app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

// Root Test Route
app.get('/', (req, res) => {
  res.send('Courier Management Backend is running!');
});

// Supabase Connection Test (Optional - on server start)
async function testSupabaseConnection() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.error('❌ Supabase connection failed:', error.message);
  } else {
    console.log('✅ Supabase connected! Sample data:', data);
  }
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  testSupabaseConnection(); // Confirm Supabase works when server starts
});
