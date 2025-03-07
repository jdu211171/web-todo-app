export interface Task {
	id?: number;
	name: string;
	description?: string;
	due_date?: string;
	status: 'Incomplete' | 'Completed';
	created_at?: string;
}

export interface TaskFilter {
	status?: 'Incomplete' | 'Completed';
	due_date?: string;
}