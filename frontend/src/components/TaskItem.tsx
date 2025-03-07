import React from 'react';
import { Task } from '../types/task';

interface TaskItemProps {
	task: Task;
	onDelete: (id: number) => void;
	onEdit: (task: Task) => void;
	onToggleStatus: (id: number, status: 'Incomplete' | 'Completed') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit, onToggleStatus }) => {
	const { id, name, description, due_date, status } = task;

	// Format date for display
	const formattedDate = due_date
		? new Date(due_date).toLocaleDateString('ja-JP')
		: '期限なし';

	// Translate status
	const statusText = status === 'Completed' ? '完了' : '未完了';

	return (
		<div className={`task-item ${status === 'Completed' ? 'completed' : ''}`}>
			<div className="task-content">
				<div className="task-header">
					<h3>{name}</h3>
					<div className="task-status">
            <span className={`status-badge ${status === 'Completed' ? 'completed' : 'incomplete'}`}>
              {statusText}
            </span>
					</div>
				</div>

				{description && (
					<div className="task-description">
						<p>{description}</p>
					</div>
				)}

				<div className="task-details">
					<span className="due-date">期限: {formattedDate}</span>
				</div>
			</div>

			<div className="task-actions">
				<button
					className="toggle-status-btn"
					onClick={() => onToggleStatus(
						id as number,
						status === 'Completed' ? 'Incomplete' : 'Completed'
					)}
				>
					{status === 'Completed' ? '未完了にする' : '完了にする'}
				</button>
				<button className="edit-btn" onClick={() => onEdit(task)}>
					編集
				</button>
				<button className="delete-btn" onClick={() => onDelete(id as number)}>
					削除
				</button>
			</div>
		</div>
	);
};

export default TaskItem;