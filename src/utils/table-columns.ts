import type { Content } from "src/models/content.type";
import type { TableColumn } from "src/models/table";
import { dateFormat } from "../utils/date-format";
import { moneyFormat } from "../utils/money-format";

export class TableColumns {
    
    value: string

    setTableColumns(data: Content, column: TableColumn): string {
        this.value = data[column.name];
        
        column.isDate ? this.value = dateFormat(data[column.name]) : null;
        column.isObject ? this.value = data[column.name].name : null;
        column.isTotal ? this.value = moneyFormat(column.calc(data[column.fieldToCalcX], data[column.fieldToCalcY])) : null;
        column.isCurrency ? this.value = moneyFormat(data[column.name]) : null;
        
        return this.value;
    }
}