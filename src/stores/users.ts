import type { TableData } from "src/models/table";
import { writable } from "svelte/store";

let emptyUsers: TableData;
export const users = writable(emptyUsers);

const fetchUsers = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/users?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    users.set(data);
}

fetchUsers();

export { fetchUsers };