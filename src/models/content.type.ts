import { Content } from "@smui-extra/accordion";
import type { Category } from "./category/category";
import type { Product } from "./products/products";
import type { Users } from "./users/users";

export type Content = Product | Category | Users;
