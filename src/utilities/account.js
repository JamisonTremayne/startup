import { createUserData } from './userData.js';
import { saveUserData } from './saveSystem.js';

export function createAccount(userName, password, email, userData) {
    return {
        userName,
        password,
        email,
        userData
    };
}

export function makeAccount(userName, password, email, isGuest) {
    const userData = createUserData(userName);
    const account = createAccount(userName, password, email, userData);
    const json = JSON.stringify(account);
    if (isGuest) {
        localStorage.setItem('guest_account', json);
    }
    //Normally this would be stored in a database, but for now it works the same as a guest account
    localStorage.setItem('account', json);
    saveUserData(userData);

    let accountArray = JSON.parse(localStorage.getItem('account_array')) || [];
    accountArray.push(account);
    localStorage.setItem('account_array', JSON.stringify(accountArray));
    return account;
}

export function makeGuestAccount() {
    // Normally would find a unique index so that guest accounts are still unique, 
    // but that can be added with databases
    const userName = 'Guest' + '';
    return makeAccount(userName, '', '', true);
}

export function updateUserData(account, userData) {
    return {
        ...account,
        userData
    };
}

export function saveAccount(account) {
    // Normally would also update a database, but for now this works.
    const json = JSON.stringify(account);
    localStorage.setItem('account', json);
    if (account.password === '' && account.email === '') {
        localStorage.setItem('guest_account', json);
    }
    let accountArray = JSON.parse(localStorage.getItem('account_array')) || [];
    let found = false;
    for (let i = 0; i < accountArray.length; i++) {
        const acc = accountArray[i];
        if (acc.userName === account.userName) {
            accountArray[i] = account;
            found = true;
            break;
        }
    } 
    if (!found) {
        accountArray.push(account);
    }
    localStorage.setItem('account_array', JSON.stringify(accountArray));
}

export function findAccount(userName) {
    const accountArray = JSON.parse(localStorage.getItem('account_array')) || [];
    for (let i = 0; i < accountArray.length; i++) {
        const account = accountArray[i];
        if (account.userName === userName) {
            return account;
        }
    }
    return null;
}

export function saveGame(userData, account, setToast) {
    saveUserData(userData);
    saveAccount(updateUserData(account, userData));
    setToast({
        message: 'Game Saved',
        type: 'success'
    });
}

export function logout(userData, account, setUserData, setAccount, setToast) {
    saveGame(userData, account, setToast);
    localStorage.removeItem('account');
    setUserData(() => null);
    setAccount(() => null);
}