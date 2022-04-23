import type { Content } from "src/models/content.type";
import type { TableColumn } from "src/models/table";

export class Utils {

    private value: string;

    public setToken(authorization: string): void {
        localStorage.setItem('token', JSON.stringify(authorization));
    }

    public setInfo(info): void {
        localStorage.setItem('userData', JSON.stringify(info));
    }

    public getInfo() {
        return JSON.parse(localStorage.getItem('userData')) || 'User not found';
    }

    public moneyFormat = (item) => {
        if (item) {
            return item.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } else {
            return "-";
        }
    };

    public dateFormat = (date) => {
        if(!date) return;
        return new Date(date).toLocaleDateString("en-US");
    };

    public setTableColumns(data: Content, column: TableColumn): string {
        this.value = data[column.name];

        column.isDate ? this.value = this.dateFormat(data[column.name]) : null;
        column.isObject ? this.value = data[column.name].name : null;
        column.isTotal ? this.value = this.moneyFormat(column.calc(data[column.fieldToCalcX], data[column.fieldToCalcY])) : null;
        column.isCurrency ? this.value = this.moneyFormat(data[column.name]) : null;

        return this.value;
    }
    
}