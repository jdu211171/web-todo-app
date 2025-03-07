import { TaskModel } from '../models/task.js';
export const TaskController = {
    // Get all tasks
    getAllTasks: (req, res) => {
        try {
            const filter = {};
            if (req.query.status) {
                filter.status = req.query.status;
            }
            if (req.query.due_date) {
                filter.due_date = req.query.due_date;
            }
            const tasks = TaskModel.getAll(Object.keys(filter).length > 0 ? filter : undefined);
            res.json(tasks);
        }
        catch (error) {
            console.error('Error getting tasks:', error);
            res.status(500).json({ error: 'Failed to get tasks' });
        }
    },
    // Get task by ID
    getTaskById: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const task = TaskModel.getById(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        }
        catch (error) {
            console.error('Error getting task:', error);
            res.status(500).json({ error: 'Failed to get task' });
        }
    },
    // Create new task
    createTask: (req, res) => {
        try {
            const { name, description, due_date, status } = req.body;
            // Validate required fields
            if (!name || name.trim() === '') {
                return res.status(400).json({ error: 'Task name is required' });
            }
            const newTask = {
                name,
                description,
                due_date,
                status: status || 'Incomplete'
            };
            const task = TaskModel.create(newTask);
            res.status(201).json(task);
        }
        catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Failed to create task' });
        }
    },
    // Update task
    updateTask: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, description, due_date, status } = req.body;
            // Validate required fields if provided
            if (name !== undefined && (name === null || name.trim() === '')) {
                return res.status(400).json({ error: 'Task name cannot be empty' });
            }
            const updatedTask = {};
            if (name !== undefined)
                updatedTask.name = name;
            if (description !== undefined)
                updatedTask.description = description;
            if (due_date !== undefined)
                updatedTask.due_date = due_date;
            if (status !== undefined)
                updatedTask.status = status;
            const success = TaskModel.update(id, updatedTask);
            if (!success) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ message: 'Task updated successfully' });
        }
        catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ error: 'Failed to update task' });
        }
    },
    // Delete task
    deleteTask: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const success = TaskModel.delete(id);
            if (!success) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json({ message: 'Task deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
};
