import type { TableData } from "src/models/table";
import { writable } from "svelte/store";
import axios from 'axios';
import { selectedValues } from './table';

let emptyUsers: TableData;
export const users = writable(emptyUsers);

const fetchUsers = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/users?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    users.set(data);
}

const create = async (formValues) => {
    return axios.post('http://localhost:8080/api/users', formValues)
        .then((res) => {
            fetchUsers();
            return res;
        })
        .catch((error) => {
            return error;
        });
}

const remove = async (ids) => {
    return axios.post('http://localhost:8080/api/users/remove', ids).then(res => {
        fetchUsers();
        selectedValues.set([]);
    });
}


fetchUsers();

export { fetchUsers, create, remove };