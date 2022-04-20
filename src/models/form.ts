import type { Content } from "./content.type";

export interface FormFields {
    name: string;
    label: string;
    type: string;
    value: string;
    isSelect?: boolean;
    data?: Content[]
}