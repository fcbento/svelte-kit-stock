export class UserInfo {

    setToken(authorization) {
        localStorage.setItem('token', JSON.stringify(authorization));
    }

    setInfo(info) {
        localStorage.setItem('userData', JSON.stringify(info));
    }

    getInfo() {
        return JSON.parse(localStorage.getItem('userData')) || 'User not found';
    }
}