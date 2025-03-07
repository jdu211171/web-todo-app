import db from '../db/database.js';
import { Task, TaskFilter } from '../types/task.js';

export const TaskModel = {
    // Get all tasks with optional filtering
    getAll: (filter?: TaskFilter): Task[] => {
        let query = 'SELECT * FROM tasks';
        const params: any[] = [];

        if (filter) {
            const conditions: string[] = [];

            if (filter.status) {
                conditions.push('status = ?');
                params.push(filter.status);
            }

            if (filter.due_date) {
                conditions.push('due_date = ?');
                params.push(filter.due_date);
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
        }

        query += ' ORDER BY created_at DESC';

        return db.prepare(query).all(...params) as Task[];
    },

    // Get single task by ID
    getById: (id: number): Task | undefined => {
        return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as Task | undefined;
    },

    // Create a new task
    create: (task: Task): Task => {
        const { name, description, due_date, status } = task;
        const result = db.prepare(
            'INSERT INTO tasks (name, description, due_date, status) VALUES (?, ?, ?, ?)'
        ).run(name, description || null, due_date || null, status || 'Incomplete');

        return { ...task, id: result.lastInsertRowid as number };
    },

    // Update an existing task
    update: (id: number, task: Partial<Task>): boolean => {
        const existingTask = TaskModel.getById(id);

        if (!existingTask) return false;

        const updatedTask = { ...existingTask, ...task };
        const { name, description, due_date, status } = updatedTask;

        db.prepare(
            'UPDATE tasks SET name = ?, description = ?, due_date = ?, status = ? WHERE id = ?'
        ).run(name, description || null, due_date || null, status, id);

        return true;
    },

    // Delete a task
    delete: (id: number): boolean => {
        const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
        return result.changes > 0;
    }
};