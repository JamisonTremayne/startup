
export class AuthData {
    constructor(password, authToken) {
        this.password = password;
        this.authToken = authToken;
    }
}

// This function would normally include encryption and database requests, but for now this works
export function verifyAccount(userName, password, email) {
    const raw = localStorage.getItem('account') || '';

    if (raw === '') {
        return false;
    }
    const account = JSON.parse(raw);
    if (account.password !== password) {
        return false;
    }
    return true;
}