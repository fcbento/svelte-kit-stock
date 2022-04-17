import type { Category } from "../category/category";

export interface Product {
    createdAt?: Date;
    image: string;
    name: string;
    price: number;
    productId?: number;
    quantity: number;
    category: Category;
}