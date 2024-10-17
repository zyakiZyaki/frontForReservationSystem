'use strict'

export { fetchingDataById, fetchingData, createBooking, changeBooking, deleteBooking }

const url = localStorage.url + "api/checks/"
const bearer = 'Bearer ' + localStorage.jwt;

async function fetchingData() {
    const response = await fetch(url + 'reservation', {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

async function fetchingDataById(id) {
    const response = await fetch(url + id, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

async function createBooking(booking) {
    let data = {
        "data": booking
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result.data.id
}

async function changeBooking(booking, id) {
    let data = {
        "data": booking
    }
    const response = await fetch(url + id, {
        method: 'PUT',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result.data.id
}

async function deleteBooking(id) {
    const response = await fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result.data.id
}
