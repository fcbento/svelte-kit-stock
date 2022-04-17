import type { TableColumn, TableHeader } from "../table";

export const ProductColumns: TableColumn[] = [
    {
        name: 'name'
    },
    {
        name: 'price',
        isCurrency: true
    },
    {
        name: 'quantity'
    },
    {
        name: 'image',
        isImage: true
    },

    {
        name: 'category',
        isObject: true
    },
    {
        name: 'createdAt',
        isDate: true
    },
    {
        name: 'total',
        isTotal: true,
        fieldToCalcX: 'price',
        fieldToCalcY: 'quantity',
        calc: (x: number, y: number) => x * y
    }
];

export const ProductHeaders: TableHeader[] = [
    {
        name: 'Name'
    },
    {
        name: 'Pricees'
    },
    {
        name: 'Quantity'
    },
    {
        name: 'Image'
    },
    {
        name: 'Category'
    },
    {
        name: 'Created At'
    },
    {
        name: 'Total'
    },
]