import express from 'express'
import {Router} from "express";
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const router = new Router()

app.use('/fib', router)

const DB = [
    {
        password: 111
    },
    {
        password: 222
    },
    {
        password: 333
    }
]

let count = 0

const login = async (req, res) => {
    try {
        const {password} = req.body

        const user = DB.find(u => u.password === Number(password))

        const fibonacci_check = (n) => {
            if (n === 1 || n === 0) return false
            if (n < 0) return false

            let prev = 0
            let curr = 1

            for (let i = 0; i <= n; i++) {
                let next = prev + curr
                prev = curr
                curr = next
            }
            return curr
        }

        const sleep = async (ms) => {
            return new Promise(resolve => {
                setTimeout(resolve, ms)
            })
        }

        const auth = async () => {
            if (!user) {
                count++
                if (count >= 3) {
                    const not_valid = fibonacci_check(count)
                    const wait = not_valid * 60000
                    console.log(`временная блокировка на ${not_valid} мин`)
                    await sleep(wait)
                }
                return res.status(400).json({message: "неверный пароль"})
            }
            count = 0
            return res.status(200).json({message: "успех"})
        }
        await auth()
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "неизвестная ошбика"})
    }
}


router.post('/login', login)

app.listen(5000, () => {
    console.log("сервер работает")
})

