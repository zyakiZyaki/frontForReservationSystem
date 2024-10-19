'use strict'

export default async function authFetch(name, pass) {

    const response = await fetch(localStorage.url + 'api/auth/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "identifier": name,
            "password": pass
        })
    });
    const result = await response.json();
    if (result.jwt) {
        localStorage.setItem('jwt', result.jwt)
    }
    return result
}