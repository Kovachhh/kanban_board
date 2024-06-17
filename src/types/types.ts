export interface BoardType {
    id: string;
    name: string;
    columns: ColumnType[];
}

export interface ColumnType {
    id: string;
    name: string;
    tasks: TaskType[];
}

export interface TaskType {
    id: string;
    name: string;
    description?: string;
    position?: Number;
}