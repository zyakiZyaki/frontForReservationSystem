'use strict'

import { formData } from './formData.js'
import { createListenersOnForm } from './listenersOnForm.js'

export { createModalForm }

async function createModalForm(data, id) {

    const { wrap, form, close } = createHtmlFrameOfmodalWindow()

    createContentsFormByFormData(data, form)
    createRightPartOfModalWindow(data, wrap)

    return createListenersOnForm(form, wrap, close, id)

}

function createContentsFormByFormData(data, form) {
    for (const name of Object.keys(formData)) {
        const input = document.createElement('input')
        const label = document.createElement('label')
        for (const atr of Object.keys(formData[name])) {
            if (atr === 'label') {
                label.innerText = formData[name].label
                form.append(label)
            }
            input[atr] = formData[name][atr]
            input.required = true
            if (data) {
                data[name] ? input.value = data[name] : null
            }
        }
        if (input.label) {
            input.required = false
            if (data?.meet) {
                input.checked = true
            }
            label.append(input)
        }
        else {
            form.append(input)
        }
    }
    createSubmitButtons(form, data.id)
}

function createRightPartOfModalWindow(data, wrap) {
    if (data.id) {
        const div = document.createElement('div')
        wrap.append(div);
        const h2 = document.createElement('h2')
        h2.innerText = "Расчет"
        div.append(h2);
        const days = document.createElement('p')
        div.append(days);
        for (const calcAboutBooking in data.calc) {
            const price = document.createElement('p')
            price.innerText = calcAboutBooking + ": " + data.calc[calcAboutBooking]
            div.append(price);
        }
    }
}

function createHtmlFrameOfmodalWindow() {
    const body = document.querySelector('body');
    const wrap = document.createElement('section')
    body.prepend(wrap);
    const form = document.createElement('form')
    wrap.append(form);
    const close = document.createElement('span')
    close.innerText = 'x'
    form.append(close);
    return { wrap, form, close }
}

function createSubmitButtons(form, id) {
    const submit = document.createElement('button')
    if (id) {
        submit.innerText = 'Изменить'
        form.append(submit)
        createDeleteButton(form)
    } else {
        submit.innerText = 'Создать'
        form.append(submit)
    }
}

function createDeleteButton(form) {
    const submitDelete = document.createElement('button')
    submitDelete.innerText = 'Удалить'
    submitDelete.classList = 'delete'
    form.append(submitDelete);
}
