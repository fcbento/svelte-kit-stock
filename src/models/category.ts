import type { TableColumn, TableHeader } from "./table";

export interface Category {
    categoryId: number;
    createdAt?: Date;
    name?: string
}

export const CategoryColumns: TableColumn[] = [
    {
        name: 'name'
    },
    {
        name: 'createdAt',
        isDate: true
    }
];

export const CategoryHeaders: TableHeader[] = [
    {
        name: 'Name'
    },
    {
        name: 'Created At'
    }
];