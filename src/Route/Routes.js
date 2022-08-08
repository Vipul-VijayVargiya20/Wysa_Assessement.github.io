const express = require("express");
const router = express.Router();
const userController = require('../controller/userController')
const sleepController = require('../controller/sleepController')
const auth = require('../Middleware/Authentication and Authorization')



router.get("/test", (req, res) => {
    res.send("welcome to wysa server")
})


//*********************Use http methods (Post) to registerUser**************************************** *//

router.post("/Userregister", userController.UserRegistration)

//*********************Use http methods (Post) to LoginUser**************************************** *//

router.post("/Userlogin", userController.UserLogin)

//*********************Use http methods (Post) to RegisterSleep Information**************************************** *//


router.post("/SleepRegister", auth.authentication, sleepController.SleepInfo)




module.exports = router;