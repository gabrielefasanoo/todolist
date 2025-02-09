import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Il titolo è obbligatorio'],
    trim: true,
    maxLength: [100, 'Il titolo non può superare i 100 caratteri'],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'La descrizione non può superare i 500 caratteri'],
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active',
  },
  priority: {
    type: String,
    enum: ['bassa', 'media', 'alta'],
    default: 'media',
  },
  dueDate: {
    type: Date,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Middleware pre-save per aggiornare updatedAt
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  if (this.isModified('completed') && this.completed) {
    this.completedAt = new Date();
  }
  
  next();
});

// Metodi virtuali
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) return false;
  return new Date() > this.dueDate;
});

taskSchema.virtual('timeRemaining').get(function() {
  if (!this.dueDate || this.completed) return null;
  return this.dueDate - new Date();
});

// Metodi statici
taskSchema.statics.findByPriority = function(priority) {
  return this.find({ priority });
};

taskSchema.statics.findOverdue = function(userId) {
  return this.find({
    user: userId,
    dueDate: { $lt: new Date() },
    completed: false,
  });
};

// Metodi di istanza
taskSchema.methods.markAsCompleted = async function() {
  this.completed = true;
  this.completedAt = new Date();
  this.status = 'completed';
  return await this.save();
};

taskSchema.methods.archive = async function() {
  this.status = 'archived';
  return await this.save();
};

// Configurazione del modello
taskSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task; 