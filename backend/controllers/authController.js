import { generateToken } from '../utils/generateToken.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Suppose you fetched user from Supabase here
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // (Optionally verify password using bcrypt)

  const token = generateToken(user); // ✅ Create JWT

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};
