import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validation';
import { verifyToken, AuthRequest } from '../middleware/auth';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/authValidator';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { UserModel } from '../models/User';
import { sendEmail } from '../config/email';
import { AppError } from '../middleware/errorHandler';
import { generateCode } from '../utils/generator';

const router = Router();

// Register
router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, username } = req.body;

  // Check if user exists
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await UserModel.create({
    email,
    username,
    password_hash: passwordHash,
    first_name: firstName,
    last_name: lastName
  });

  // Generate tokens
  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      },
      accessToken,
      refreshToken
    }
  });
});

// Login
router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      },
      accessToken,
      refreshToken
    }
  });
});

// Refresh Token
router.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  // Verify and refresh
  res.json({
    success: true,
    message: 'Token refreshed',
    data: { accessToken: refreshToken }
  });
});

// Forgot Password
router.post('/forgot-password', validate(forgotPasswordSchema), async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    // Don't reveal if email exists
    res.json({ success: true, message: 'If email exists, password reset link sent' });
    return;
  }

  const resetCode = generateCode();
  // Store reset code in cache or database

  // Send email
  await sendEmail(email, 'Password Reset', `Your reset code: ${resetCode}`);

  res.json({
    success: true,
    message: 'Password reset email sent'
  });
});

// Reset Password
router.post('/reset-password', validate(resetPasswordSchema), async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  // Verify token and update password
  const passwordHash = await hashPassword(newPassword);
  // Update user password

  res.json({
    success: true,
    message: 'Password reset successfully'
  });
});

// Logout
router.post('/logout', verifyToken, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

export default router;
