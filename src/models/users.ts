import type { TableColumn, TableHeader } from "../models/table";
import type { FormFields } from "./form";

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

export const UserFormBuilder = (): FormFields[] => {
    return [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            value: ''
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            value: ''
        },
        {
            name: 'role',
            label: 'Role',
            type: 'number',
            value: ''
        },
        {
            name: 'password',
            label: 'Password',
            type: 'text',
            value: ''
        }
    ];
}