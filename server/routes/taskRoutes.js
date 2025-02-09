import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getOverdueTasks,
  archiveTask,
  getTaskStats,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.get('/overdue', getOverdueTasks);
router.put('/:id/archive', archiveTask);
router.get('/stats', getTaskStats);

export default router; 