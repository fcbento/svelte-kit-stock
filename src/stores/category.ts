import type { TableData } from "src/models/table";
import { writable } from "svelte/store";

let emptyCategories: TableData;

export const categories = writable(emptyCategories);

const fetchCategories = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/categories?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    categories.set(data);
}

fetchCategories();

export { fetchCategories };