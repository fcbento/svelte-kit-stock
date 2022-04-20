import type { TableColumn, TableHeader } from "../models/table";

export interface Users {
    addressList: [];
    createdAt: Date;
    email: string;
    id: number;
    name: string;
    phoneNumber: number;
    profiles: string[];
    role: number;
}

export const UsersColumns: TableColumn[] = [
    {
        name: "name",
    },
    {
        name: "email",
    },
    {
        name: "role",
    },
];

export const UsersHeaders: TableHeader[] = [
    {
        name: 'Name'
    },
    {
        name: 'Email'
    },
    {
        name: 'Role'
    }
]