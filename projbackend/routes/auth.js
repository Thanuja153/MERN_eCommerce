var express = require("express");
var router = express.Router()

const {check,validationResult} = require("express-validator")
const {signup,signout,signin, isSignedIn} = require("../controllers/auth")

router.post("/signup",[check("name","name should be atleast 3 character").isLength({min:3}),
check("email","email is required").isEmail(),
check("password","password must be atleast 3 characters").isLength({min:3}),],
signup);

router.post("/signin",
[
check("email","email is required").isEmail(),
check("password","password must be atleast 3 characters").isLength({min:3}),],
signin);

router.get("/signout", signout );

// router.get("/testroute",isSignedIn,(req,res)=>{
//     res.json(req.auth);
// })



// router.get("/signin", (req, res) => {
//     res.send("User SignIn");
// });

module.exports = router;

