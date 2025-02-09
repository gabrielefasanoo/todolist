import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { APIError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendEmail from '../utils/email.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Rimuovi la password dall'output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  // Verifica se l'utente esiste già
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new APIError('Email già registrata', 400);
  }

  // Crea nuovo utente
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new APIError('Inserisci email e password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password))) {
    throw new APIError('Email o password non validi', 401);
  }

  // Aggiorna lastLogin
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new APIError('Non esiste un utente con questa email', 404);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset della password',
      message: `Per reimpostare la password, clicca sul seguente link: ${resetURL}`,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token inviato via email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new APIError('Errore nell\'invio dell\'email. Riprova più tardi.', 500);
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new APIError('Token non valido o scaduto', 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  await user.updatePassword(req.body.currentPassword, req.body.newPassword);
  createSendToken(user, 200, res);
});

export const updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    throw new APIError('Questa route non è per l\'aggiornamento della password', 400);
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'avatar');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

export const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
}); 