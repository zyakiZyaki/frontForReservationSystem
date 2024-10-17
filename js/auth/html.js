'use strict'

export { createForm, showResponseValidation }

function createForm() {

    const body = document.body

    const form = document.createElement("form")
    form.classList = 'auth'
    body.append(form)

    const name = document.createElement("input")
    name.id = "name"
    name.placeholder = 'Логин'
    form.append(name)

    const pass = document.createElement("input")
    pass.id = "pass"
    pass.placeholder = 'Пароль'
    form.append(pass)

    const url = document.createElement("input")
    url.id = "url"
    url.placeholder = 'url'
    form.append(url)

    const submit = document.createElement("button")
    submit.innerText = 'Отправить'
    submit.type = 'submit'
    form.append(submit)

    form.addEventListener('input', ()=> {
        hideResponseValidation()
    })

    return form
}

function showResponseValidation(resp) {
    const response = document.querySelector(".response")
    if (response) {
        return
    }
    else {
        const response = document.createElement("p")
        response.classList.add('response')
        response.innerText = resp
        document.body.append(response)
    }
}

function hideResponseValidation() {
    const response = document.querySelector(".response")
    if (response) {
        return response.remove()
    }
    else {
        return
    }
}