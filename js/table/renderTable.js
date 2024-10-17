'use strict'

import { fetchingData } from '../api/api.js'
import { addListenersOnTableBody } from './listenerOnTable.js'

export default renderTable

function renderTable() {

    const table = createHtmlFrameOfTable()

    const firstDay = new Date(2025, 5, 1).getTime()
    const endDay = new Date(2025, 9, 1).getTime()

    return fillTableByData(firstDay, endDay, table.thead, table.tbody)
}

async function fillTableByData(firstDay, endDay, thead, tbody) {

    fillTableHead(firstDay, endDay, thead)
    fillTableBody(await fetchingData(), firstDay, endDay, tbody)

    return addListenersOnTableBody(tbody)
}

function fillTableBody(data, firstDay, endDay, tbody) {
    for (const room of data) {
        const tr = document.createElement("tr");
        tbody.append(tr);
        let count = 0
        let i = 0
        while (count <= workDays(firstDay,endDay)) {
            const td = document.createElement("td");
            if (count === 0) {
                td.classList.add('fixCol')
                td.innerText = room.name
                td.id = room.id
            }
            if (room.bookings[i]) {
                const booking = room.bookings[i]
                if (count === 1 + fullDaysFrom(booking.checkIn, firstDay)) {
                    td.innerHTML = hourOf(booking.checkIn) + ':' + minutesOf(booking.checkIn) + ' ' + booking.name;
                    td.id = booking.id
                    td.classList.add("check")
                }
                if (count > 1 + fullDaysFrom(booking.checkIn, firstDay) && count <= fullDaysFrom(booking.checkOut, firstDay)) {
                    td.classList.add("check")
                }
                if (count === fullDaysFrom(booking.checkOut, firstDay)) {
                    td.innerText = hourOf(booking.checkOut) + ':' + minutesOf(booking.checkOut) + " →"
                    i++
                }
            }
            count++
            tr.append(td);
        }
    }
}

function fillTableHead(firstDay, endDay, thead) {
    const tr = document.createElement('tr')
    tr.classList.add('dates')
    thead.append(tr)
    const th = document.createElement('th')
    tr.append(th)
    let count = 0
    while (count < workDays(firstDay, endDay)) {
        const date = new Date(firstDay)
        date.setDate(count+1)
        const day = date.getDate()
        const month = '0' + (date.getMonth() + 1)
        const th = document.createElement("th");
        th.classList.add("singleDate");
        th.innerText = day + '.' + month
        tr.append(th);
        count++
    }
}

function workDays(firstDay, endDay) {
    return (endDay - firstDay) / 86400000
}

function hourOf(date) {
    return new Date(date).getHours() == 0 ? "00" : new Date(date).getHours()
}

function minutesOf(date) {
    return new Date(date).getMinutes() == 0 ? "00" : new Date(date).getMinutes()
}

function fullDaysFrom(date, firstDay) {
    return parseInt((new Date(date).getTime() - firstDay) / 86400000)
}

function createHtmlFrameOfTable() {
    const body = document.body
    const table = document.createElement('table')
    table.border = '1'
    body.append(table)
    const thead = document.createElement('thead')
    table.append(thead)
    const tbody = document.createElement('tbody')
    table.append(tbody)

    return {thead, tbody}
}