export class Utils {

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
    
}