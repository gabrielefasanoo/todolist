import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import { APIError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  // 1) Ottieni il token e controlla se esiste
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new APIError('Non sei autenticato. Effettua l\'accesso per accedere', 401);
  }

  // 2) Verifica il token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Controlla se l'utente esiste ancora
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new APIError('L\'utente di questo token non esiste più', 401);
  }

  // 4) Controlla se l'utente ha cambiato password dopo l'emissione del token
  if (user.changedPasswordAfter(decoded.iat)) {
    throw new APIError('Password modificata di recente. Effettua nuovamente l\'accesso', 401);
  }

  // Accesso concesso
  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new APIError('Non hai i permessi per eseguire questa azione', 403);
    }
    next();
  };
}; 