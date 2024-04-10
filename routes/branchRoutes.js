const express = require('express')

const branchController = require('../controllers/branchController')

const router = express.Router()
// get list 
router.get('/', branchController.getListBranch)
// create branch
router.post('/', branchController.createBranch)
// update branch
router.put('/:id', branchController.updateBranch)
// delete branch 
router.delete('/:id', branchController.deleteBranch)

module.exports = router