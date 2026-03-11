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

export async function makeAccount(userName, password, email, isGuest) {
    const userData = createUserData(userName);
    const account = createAccount(userName, password, email, userData);
    const json = JSON.stringify(account);
    if (isGuest) {
        localStorage.setItem('guest_account', json);
    }
    //Normally this would be stored in a database, but for now it works the same as a guest account
    localStorage.setItem('account', json);
    await saveUserData(userData);

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

export async function findAccount(userName) {
    const response = await fetch(`api/auth/login/`, {
    method: 'post',
    body: JSON.stringify({ userName: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  } else {
    const body = await response.json();
    setDisplayError(`⚠ Error: ${body.msg}`);
  }
}

export function saveGame(userData, setToast) {
    saveUserData(userData);
    setToast({
        message: 'Game Saved',
        type: 'success'
    });
}

export function logout(setUserName, userData, setUserData, setToast) {
    fetch(`/api/auth/logout`, {
        method: 'delete',
    })
        .catch(() => {
        // Logout failed. Assuming offline
        })
        .finally(() => {
            saveGame(userData, setToast);
            localStorage.removeItem('userName');
            setUserName(() => '');
            setUserData(() => null);
            props.onLogout();
        });
}