import type { Category } from "./category";
import type { Content } from "./content.type";
import type { FormFields } from "./form";
import type { TableColumn, TableData, TableHeader } from "./table";

export interface Product {
    createdAt?: Date;
    image: string;
    name: string;
    price: number;
    productId?: number;
    quantity: number;
    category: Category;
}

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
        name: 'Prices'
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

export const ProductFormBuilder = (data: Content[]): FormFields[] => {
    return [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            value: ''
        },
        {
            name: 'category',
            label: 'Category',
            type: 'text',
            isSelect: true,
            value: '',
            data: data
        },
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            value: ''
        },
        {
            name: 'image',
            label: 'Image',
            type: 'text',
            value: ''
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            value: ''
        }
    ];
}