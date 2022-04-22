import type { Content } from "src/models/content.type";
import type { TableColumn } from "src/models/table";
import { Utils } from "../utils/utils";

export class TableColumns {

    private value: string;
    private utils = new Utils();

    setTableColumns(data: Content, column: TableColumn): string {
        this.value = data[column.name];

        column.isDate ? this.value = this.utils.dateFormat(data[column.name]) : null;
        column.isObject ? this.value = data[column.name].name : null;
        column.isTotal ? this.value = this.utils.moneyFormat(column.calc(data[column.fieldToCalcX], data[column.fieldToCalcY])) : null;
        column.isCurrency ? this.value = this.utils.moneyFormat(data[column.name]) : null;

        return this.value;
    }
}