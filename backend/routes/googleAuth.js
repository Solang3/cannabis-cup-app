// routes/googleAuth.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5050/api/auth/google/callback';

// 1️⃣ Redireccionamos a Google
router.get('/google', (req, res) => {
  const scope = encodeURIComponent('openid profile email');
  const redirect = 
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code&scope=${scope}&prompt=select_account`;
  
  res.redirect(redirect);
});

// 2️⃣ Google llama esta ruta con ?code
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code');

  try {
    // 3️⃣ Intercambiamos el code por tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const accessToken = tokenRes.data.access_token;

    // 4️⃣ Usamos el token para pedir el perfil
    const profileRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { email, name, picture } = profileRes.data;

    // 5️⃣ Buscamos o creamos el user
    let user = await User.findOne({ username: email });
    if (!user) {
      user = new User({
        username: email,
        role: 'user',
        approved: true,
        displayName: name,
        photoUrl: picture
      });
      await user.save();
    }

    // 6️⃣ Creamos token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username,
        displayName: user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 7️⃣ Redirigimos al frontend con el token en query param
    res.redirect(`http://localhost:4200/auth-callback?token=${token}`);
  } catch (err) {
    console.error('OAuth error', err.response?.data || err);
    res.status(500).send('OAuth error');
  }
});

module.exports = router;
