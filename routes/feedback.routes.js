const express = require('express')

const feedbackController = require('../controllers/feedbackController')


const router = express.Router()
// Tạo feedback
router.post('/', feedbackController.createFeedback)
// Danh sách toàn bộ lượt feedback 
router.get('/', feedbackController.getListFeedback)
// Chi tiết feedback (generic parameterized route)
// router.get('/:id', feedbackController.getD)
// cập nhật feedback
// router.put('/:id', feedbackController.updateFeedback)
    
// xoas  feedback
// router.delete('/:id', feedbackController.deleteFeedback)
module.exports = router;
