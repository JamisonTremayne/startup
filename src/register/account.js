import { createUserData } from '../userData.js';
import { saveUserData } from '../saveSystem.js';

export class Account {
    constructor(userName, password, email, userData) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.userData = userData;
    }
}

export function makeAccount(userName, password, email, isGuest) {
    const userData = createUserData(userName);
    const account = new Account(userName, password, email, userData);
    const json = JSON.stringify(account);
    if (isGuest) {
        localStorage.setItem('guest_account', json);
    }
    //Normally this would be stored in a database, but for now it works the same as a guest account
    localStorage.setItem('account', json);
    saveUserData(userData);
    return account;
}

export function makeGuestAccount() {
    // Normally would find a unique index so that guest accounts are still unique, 
    // but that can be added with databases
    const userName = 'Guest' + '';
    return makeAccount(userName, '', '', true);
}