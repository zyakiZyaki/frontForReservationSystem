'use strict'

import { createModalForm } from '../form/form.js'
import { fetchingDataById } from '../api/api.js'

export { addListenersOnTableBody }

function addListenersOnTableBody(tbody) {
    
    tbody.addEventListener('click', async (e) => {
        const modalWindow = document.querySelector('section')
        if(modalWindow) {
            return modalWindow.remove()
        }
        if (e.target.classList[0] === 'fixCol') {
            return
        }
        if (e.target.id) {
            return createModalForm(await fetchingDataById(e.target.id), e.target.id)
        }
        if (!e.target.id && e.target.classList[0] != 'check') {
            const data = {}
            const day = e.srcElement.cellIndex
            data.roomId = e.target.parentNode.firstChild.id,
            data.checkIn = toUsualDateFromIso(day)
            data.checkOut = toUsualDateFromIso(day, 3)
            return createModalForm(data)
        }
    })
}

function toUsualDateFromIso(day, checkOut) {
    let hours = 17
    if(checkOut) {
        day+=checkOut
        hours-=2
    }
    return new Date(2025, 5, day, hours, 0, 0).toISOString().slice(0,16)
}