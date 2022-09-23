const express = require("express")
const router = express.Router()
const {registerStudent, listStudents, deleteStudent} = require('../controller/studentController')

router.route('/add').post(registerStudent)
router.route('/list').get(listStudents)
router.route('/delete').post(deleteStudent)

module.exports = router