const express = require('express')
// const { where } = require('sequelize')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt');

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

    const encryptedPassword = await bcrypt.hash(password, 10)


    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "test post user endpoints"
    })
})

router.put('/', async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body
    const userData = await UsersModel.findOne({ where: { nip: nip } })

    const compare = await bcrypt.compare(password, userData.password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)

    //password yang muncul di db === password dari inputan
    if (compare === true) {
        const users = await UsersModel.update({
            nama, password: encryptedPassword
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
})



module.exports = router