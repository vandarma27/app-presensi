const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')

// routing endpoint users utama
router.get('/', async (req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data: users,
        metadata: "test user endpoints"
    })
})

router.post('/', async (req, res) => {
    const { nip, nama, password } = req.body

    const users = await UsersModel.create({
        nip, nama, password
    })
    res.status(200).json({
        data: users,
        metadata: "test post user endpoints"
    })
})

module.exports = router