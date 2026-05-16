import db from '../DB/knex.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshTokenExpiry,
} from '../utils/jwt.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

function setRefreshCookie(res, token) {
  res.cookie('refreshToken', token, COOKIE_OPTIONS);
}

function clearRefreshCookie(res) {
  res.clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: 0 });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }
    if (name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
    }

    const existing = await db('users').where({ email: email.toLowerCase() }).first();
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const password_hash = await hashPassword(password);

    const [user] = await db('users')
      .insert({
        name: name.trim(),
        email: email.toLowerCase(),
        password_hash,
        role: 'customer',
      })
      .returning(['id', 'name', 'email', 'role', 'created_at']);

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await db('refresh_sessions').insert({
      user_id: user.id,
      token_hash: hashToken(refreshToken),
      expires_at: getRefreshTokenExpiry(),
    });

    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await db('users').where({ email: email.toLowerCase() }).first();
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'This account has been deactivated.' });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // Clean expired sessions for this user
    await db('refresh_sessions')
      .where('user_id', user.id)
      .where('expires_at', '<', new Date())
      .del();

    await db('refresh_sessions').insert({
      user_id: user.id,
      token_hash: hashToken(refreshToken),
      expires_at: getRefreshTokenExpiry(),
    });

    setRefreshCookie(res, refreshToken);

    res.json({
      success: true,
      message: 'Logged in successfully.',
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await db('refresh_sessions').where({ token_hash: hashToken(token) }).del();
    }
    clearRefreshCookie(res);
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'No refresh token.' });
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      clearRefreshCookie(res);
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
    }

    const session = await db('refresh_sessions')
      .where({ token_hash: hashToken(token), user_id: payload.id })
      .where('expires_at', '>', new Date())
      .first();

    if (!session) {
      clearRefreshCookie(res);
      return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
    }

    const user = await db('users').where({ id: payload.id, is_active: true }).first();
    if (!user) {
      clearRefreshCookie(res);
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    // Rotate refresh token
    const newPayload = { id: user.id, email: user.email, role: user.role };
    const newRefreshToken = signRefreshToken(newPayload);
    const newAccessToken = signAccessToken(newPayload);

    await db('refresh_sessions').where({ id: session.id }).update({
      token_hash: hashToken(newRefreshToken),
      expires_at: getRefreshTokenExpiry(),
    });

    setRefreshCookie(res, newRefreshToken);

    res.json({
      success: true,
      accessToken: newAccessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await db('users')
      .where({ id: req.user.id })
      .select('id', 'name', 'email', 'role', 'created_at')
      .first();

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}
