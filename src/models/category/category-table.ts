import type { TableColumn, TableHeader } from "../table";

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