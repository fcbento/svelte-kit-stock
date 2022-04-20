import { Content } from "@smui-extra/accordion";
import type { Category } from "./category";
import type { Product } from "./products";
import type { Users } from "./users";

export type Content = Product | Category | Users;
