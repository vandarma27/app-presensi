const express = require('express')
const { where } = require('sequelize')
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

router.put('/', async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body

    const userData = await UsersModel.findOne({ where: { nip: nip } })

    //password yang muncul di db === password dari inputan
    if (userData.password === password) {
        const users = await UsersModel.update({
            nama, password: passwordBaru
        }, { where: { nip: nip } })

        res.status(200).json({
            users : {update : users[0]},
            metadata: "add updated"
        })
    } else {
        res.status(400).json({
            error : "data invalid"
        })
    }

    // res.status(200).json({
    //     data: users,
    //     metadata: "test post user endpoints"
    // })
})



module.exports = router