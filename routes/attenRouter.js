const express = require("express")
const router = express.Router()
const {updateAttendence, getAttendenceList} = require('../controller/attenController')

router.route('/update').post(updateAttendence)
router.route('/list').get(getAttendenceList)

module.exports = router