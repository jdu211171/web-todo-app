import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';

interface TaskFormProps {
	task?: Task;
	onSubmit: (task: Task) => void;
	onCancel: () => void;
}

const initialTask: Task = {
	name: '',
	description: '',
	due_date: '',
	status: 'Incomplete'
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState<Task>(task || initialTask);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (task) {
			setFormData(task);
		}
	}, [task]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));

		// Clear error when field is edited
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) {
			newErrors.name = 'タスク名は必須です';
		}

		// Validate due date is not in the past
		if (formData.due_date) {
			const dueDate = new Date(formData.due_date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (dueDate < today) {
				newErrors.due_date = '過去の日付は設定できません';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validate()) {
			onSubmit(formData);
		}
	};

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name">タスク名*</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="タスク名を入力"
					className={errors.name ? 'error' : ''}
				/>
				{errors.name && <div className="error-message">{errors.name}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="description">説明</label>
				<textarea
					id="description"
					name="description"
					value={formData.description || ''}
					onChange={handleChange}
					placeholder="タスクの説明を入力（任意）"
					rows={3}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="due_date">期限日</label>
				<input
					type="date"
					id="due_date"
					name="due_date"
					value={formData.due_date || ''}
					onChange={handleChange}
					className={errors.due_date ? 'error' : ''}
				/>
				{errors.due_date && <div className="error-message">{errors.due_date}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="status">ステータス</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="Incomplete">未完了</option>
					<option value="Completed">完了</option>
				</select>
			</div>

			<div className="form-actions">
				<button type="submit" className="submit-btn">
					{task ? 'タスクを更新' : 'タスクを追加'}
				</button>
				<button type="button" className="cancel-btn" onClick={onCancel}>
					キャンセル
				</button>
			</div>
		</form>
	);
};

export default TaskForm;