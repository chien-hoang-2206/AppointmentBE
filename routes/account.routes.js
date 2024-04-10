const express = require("express");

// controller functions
const accountController = require("../controllers/account.controller");

const router = express.Router();
// signup route
router.post("/", accountController.signupAccount);
// //list account user
router.get("/", accountController.getListAccount);
// // login route
router.post("/login", accountController.loginAccount);

//edit info
router.put("/:id", accountController.updateAccountInfo);

// update photo 
// router.put("/photo/:id", accountController.updateAccountPhotoList);





module.exports = router;
