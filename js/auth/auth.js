'use strict'

import { createForm, showResponseValidation } from './html.js'
import authFetch from './fetch.js'

export default async function auth() {

    const form = createForm()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        if(form.url.value) {
            localStorage.setItem("url", form.url.value)
        }
        const result = await authFetch(form.name.value,form.pass.value)
        return result.jwt ? location.reload() : showResponseValidation(result.error.name)
    })

}