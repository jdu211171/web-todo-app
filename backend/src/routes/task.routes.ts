import { Router } from 'express';
import { RequestHandler } from 'express';
import { TaskController } from '../controllers/task.controller.js';

const router = Router();

const taskController = {
    getAllTasks: TaskController.getAllTasks as RequestHandler,
    getTaskById: TaskController.getTaskById as unknown as RequestHandler,
    createTask: TaskController.createTask as unknown as RequestHandler,
    updateTask: TaskController.updateTask as unknown as RequestHandler,
    deleteTask: TaskController.deleteTask as unknown as RequestHandler
};

// Task routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;