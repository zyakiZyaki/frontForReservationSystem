'use strict'

import { createForm, showResponseValidation } from './html.js'
import authFetch from './fetch.js'

export default async function auth() {

    const { form, name, pass, url } = createForm()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        if(url.value) {
            localStorage.setItem("url", url.value)
        }
        const result = await authFetch(name.value, pass.value)
        return result.jwt ? location.reload() : showResponseValidation(result.error.name)
    })

}