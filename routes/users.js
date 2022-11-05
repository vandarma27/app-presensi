const express = require('express')
const router = express.Router()

// routing endpoint users utama
router.get('/', (req, res) => {
    res.status(200).json({
        data : "VanDarma27",
        metadata : "test user endpoints"
    })
})

module.exports = router