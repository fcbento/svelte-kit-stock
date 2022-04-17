import type { Content } from "./content.type";

export interface TableColumn {
    name: string;
    isCurrency?: boolean;
    isImage?: boolean;
    isObject?: boolean;
    isDate?: boolean;
    isTotal?: boolean;
    fieldToCalcX?: string;
    fieldToCalcY?: string;
    calc?: (x: number, y: number) => void;
}

export interface TableHeader {
    name: string;
}

export interface TableData {
    content: Array<any>;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        paged: boolean;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        }
    };
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
}

export interface Pagination {
    rowsPerPage: number;
    page: number;
}