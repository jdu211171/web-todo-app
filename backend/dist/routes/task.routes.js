import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';
const router = Router();
const taskController = {
    getAllTasks: TaskController.getAllTasks,
    getTaskById: TaskController.getTaskById,
    createTask: TaskController.createTask,
    updateTask: TaskController.updateTask,
    deleteTask: TaskController.deleteTask
};
// Task routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
export default router;
