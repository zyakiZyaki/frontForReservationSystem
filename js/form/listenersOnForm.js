'use strict'

import { createBooking, changeBooking, deleteBooking } from '../api/api.js'
import renderTable from '../table/renderTable.js'

export { createListenersOnForm }

function createListenersOnForm(form, modalWindow, close, id) {
    createListenerOnSubmit(form, modalWindow, id)
    createListenerOnClose(close, modalWindow)
    return
}

function createListenerOnSubmit(form, modalWindow, id) {
    form.addEventListener('submit', async e => {
        e.preventDefault()
        if(e.submitter.className === 'delete') {
            modalWindow.remove()
            return reloadPageOn(await deleteBooking(id))
        }
        const inputs = document.querySelectorAll('input')
        modalWindow.remove()
        return id ? reloadPageOn(await changeBooking(createDataForFetch(inputs), id)) : reloadPageOn(await createBooking(createDataForFetch(inputs)))
    })
}

function createListenerOnClose(close, modalWindow) {
    close.addEventListener('click', e => {
        e.preventDefault()
        return modalWindow.remove()
    })
}

function createDataForFetch(inputs) {
    const obj = {}
    inputs.forEach(el => {
        if (el.id === "meet") {
            obj[el.id] = el.checked
        }
        else {
            obj[el.id] = el.value
        }
    })
    return obj
}

async function reloadPageOn(id) {
    const table = document.querySelector('table')
    table.remove()
    await renderTable()
    return scrollOn(id)
}

function scrollOn(id) {
    setTimeout(() => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }, 300)
}