'use strict'

export default async function authFetch(name,pass) {

    const user = {"identifier":name,"password":pass}

    const response = await fetch(localStorage.url+'api/auth/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();

    if (result.jwt) {
        localStorage.setItem('jwt', result.jwt)
    }

    return result
}