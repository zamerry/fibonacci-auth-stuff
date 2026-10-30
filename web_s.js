const password = document.getElementById('password')
const btn = document.getElementById('next')
const invisible = document.getElementById('invisible')

btn.addEventListener('click', async () => {

    const password_value = password.value

    btn.disabled = true
    btn.innerHTML = "loading"

    try {
        await get_in(password_value)
    }   catch (e) {
        console.error(e)
    }   finally {
        btn.disabled = false
        btn.innerHTML = 'ok'
    }
})

const get_in = async (value) => {
    const res = await fetch('http://localhost:5000/fib/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: value})
    })

    const data = await res.json()

    if (!res.ok) {
        invisible.innerHTML = data.message
        invisible.style.color = 'red'
        return data.message
    }

    invisible.innerHTML = data.message
    invisible.style.color = 'green'

}