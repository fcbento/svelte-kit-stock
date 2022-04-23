import type { TableData } from "src/models/table";
import { writable } from "svelte/store";
import { selectedValues } from './table';
import { formValues } from "./form";
import axios from 'axios';


let emptyProducts: TableData;

export const products = writable(emptyProducts);

const fetchProducts = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/products?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    products.set(data);
}

const create = async (form) => {
    return axios.post('http://localhost:8080/api/products', form)
        .then((res) => {
            formValues.set([]);
            return res;
        })
        .catch((error) => {
            return error;
        });
}

const remove = async (ids) => {
    return axios.post('http://localhost:8080/api/products/remove', ids).then(res => {
        selectedValues.set([]);
        fetchProducts();
    });
}

fetchProducts();

export { fetchProducts, create, remove };