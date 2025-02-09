import Task from '../models/Task.js';
import { APIError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Ottieni tutte le attività dell'utente
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  let query = { user: req.user._id };
  
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOptions = {};
  sortOptions[sortBy] = order === 'desc' ? -1 : 1;

  const tasks = await Task.find(query)
    .sort(sortOptions)
    .select('-__v');

  res.json(tasks);
});

// Crea una nuova attività
export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(task);
});

// Aggiorna un'attività
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new APIError('Attività non trovata', 404);
  }

  res.json(task);
});

// Elimina un'attività
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    throw new APIError('Attività non trovata', 404);
  }

  res.json({ message: 'Attività eliminata' });
});

// Ottieni attività in scadenza
export const getOverdueTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findOverdue(req.user._id);
  res.json(tasks);
});

// Archivia un'attività
export const archiveTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    throw new APIError('Attività non trovata', 404);
  }

  await task.archive();
  res.json(task);
});

// Statistiche delle attività
export const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        overdue: {
          $sum: {
            $cond: [
              { 
                $and: [
                  { $lt: ['$dueDate', new Date()] },
                  { $eq: ['$completed', false] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ]);

  res.json(stats);
}); 