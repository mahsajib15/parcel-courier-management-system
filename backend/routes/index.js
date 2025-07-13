import express from 'express';

const router = express.Router();

// Example API endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'API is working fine 🔥' });
});

export default router;
