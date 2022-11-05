const express = require('express')
// const { where } = require('sequelize')
const router = express.Router()
const AbsensiModel = require('../models/absensi')
const bcrypt = require('bcrypt');
const { route } = require('./users');

// routing endpoint users utama
router.get('/', async (req, res) => {
    const absensi = await AbsensiModel.findAll()
    res.status(200).json({
        data: absensi,
        metadata: "test absensi endpoints"
    })
})

router.post('/checkin', async (req, res) => {
    const {nip} = req.body

    const absensi = await AbsensiModel.create({
        users_nip : nip, status : 'in'
    })

    res.status(200).json({
        data: absensi,
        metadata: "test absensi in endpoints"
    })
})

router.post('/checkout', async (req, res) => {
    const {nip} = req.body

    const absensi = await AbsensiModel.create({
        users_nip : nip, status : 'out'
    })
    
    res.status(200).json({
        data: absensi,
        metadata: "test absensi out endpoints"
    })
})

module.exports = router