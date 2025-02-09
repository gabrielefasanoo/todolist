// Classe personalizzata per gli errori dell'API
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Gestore degli errori per errori operazionali
const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

// Gestione errori specifici del database
const handleCastErrorDB = err => {
  const message = `Valore non valido ${err.path}: ${err.value}`;
  return new APIError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Valore duplicato: ${value}. Usa un altro valore`;
  return new APIError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Dati non validi. ${errors.join('. ')}`;
  return new APIError(message, 400);
};

// Gestione errori JWT
const handleJWTError = () =>
  new APIError('Token non valido. Effettua nuovamente l\'accesso', 401);

const handleJWTExpiredError = () =>
  new APIError('Token scaduto. Effettua nuovamente l\'accesso', 401);

// Invio errori in sviluppo
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Invio errori in produzione
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Qualcosa è andato storto!'
    });
  }
};

export { APIError, handleError }; 