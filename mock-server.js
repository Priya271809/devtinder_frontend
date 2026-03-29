const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 7777;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('.')); // Serve HTML for unmatched routes like the current error page

// Mock user data matching Login.jsx defaults
const mockUser = {
  name: 'Vishal Verma',
  emailId: 'vishalverma27@gmail.com',
  picture: 'https://via.placeholder.com/150?text=Vishal'
};

// POST /api/login
app.post('/api/login', (req, res) => {
  const { emailId, password } = req.body;
  
  console.log(`Login attempt: ${emailId}`);
  
  if (emailId === 'vishalverma27@gmail.com' && password === 'Vishal@123') {
    // Set session cookie
    res.cookie('sessionId', 'mock-session-' + Date.now(), {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    res.json(mockUser);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET /api/profile/view
app.get('/api/profile/view', (req, res) => {
  // Check session cookie
  if (req.cookies.sessionId) {
    res.json(mockUser);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// GET /api/feed
app.get('/api/feed', (req, res) => {
  const mockFeed = [
    {
      postId: 1,
      content: 'Welcome to DevTinder! 🚀',
      author: 'Admin',
      likes: 42,
      timestamp: new Date().toISOString()
    },
    {
      postId: 2,
      content: 'First post from mock server!',
      author: 'Mock User',
      likes: 5,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    // Add more mock posts
    ...Array.from({length: 3}, (_, i) => ({
      postId: 3 + i,
      content: `Mock post ${3 + i}`,
      author: `User ${i+1}`,
      likes: Math.floor(Math.random() * 20),
      timestamp: new Date(Date.now() - (i+1)*1800000).toISOString()
    }))
  ];
  res.json(mockFeed);
});

// POST /api/handleLogout
app.post('/api/handleLogout', (req, res) => {
  res.clearCookie('sessionId');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Mock DevTinder backend running on http://localhost:${PORT}`);
  console.log('Login with: vishalverma27@gmail.com / Vishal@123');
});
