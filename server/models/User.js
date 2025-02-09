import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { APIError } from '../utils/errorHandler.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: [50, 'Il nome non può superare i 50 caratteri'],
  },
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Inserisci un indirizzo email valido'
    ],
  },
  password: {
    type: String,
    required: [true, 'La password è obbligatoria'],
    minlength: [8, 'La password deve essere di almeno 8 caratteri'],
    select: false, // Non include la password nelle query
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Conferma la tua password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Le password non corrispondono',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});



// Middleware pre-save
userSchema.pre('save', async function(next) {
  // Aggiorna il timestamp
  this.updatedAt = new Date();

  // Se la password non è stata modificata, passa al prossimo middleware
  if (!this.isModified('password')) return next();

  // Hash della password
  this.password = await bcrypt.hash(this.password, 12);
  
  // Rimuovi passwordConfirm
  this.passwordConfirm = undefined;

  // Aggiorna passwordChangedAt se non è una nuova password
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// Middleware pre-query per filtrare gli utenti inattivi
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Metodi di istanza
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minuti

  return resetToken;
};

userSchema.methods.updatePassword = async function(currentPassword, newPassword) {
  // Verifica la password corrente
  const user = await this.model('User').findById(this._id).select('+password');
  if (!(await user.correctPassword(currentPassword))) {
    throw new APIError('Password corrente non valida', 401);
  }

  // Aggiorna la password
  this.password = newPassword;
  this.passwordChangedAt = Date.now();
  await this.save();
};

// Metodi statici
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Configurazione del modello
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

export default User; 