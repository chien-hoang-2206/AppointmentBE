const express = require('express')

const departmentController = require('../controllers/departmentController')

const router = express.Router()
// get list 
router.get('/', departmentController.getListDepartment)
// create branch
router.post('/', departmentController.createDepartment)
// update branch
router.put('/:id', departmentController.updateDepartment)
// delete branch 
router.delete('/:id', departmentController.deleteDepartment)

module.exports = router