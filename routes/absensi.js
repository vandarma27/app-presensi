const express = require('express')
// const { where } = require('sequelize')
const router = express.Router()
const AbsensiModel = require('../models/absensi')
const bcrypt = require('bcrypt');

// routing endpoint users utama
router.get('/', async (req, res) => {
    const absensi = await AbsensiModel.findAll()
    res.status(200).json({
        data: absensi,
        metadata: "test user endpoints"
    })
})