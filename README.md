<!-- # Wysa_Assessement -->

<!-- My solution to the assessment REST apis [link to md file] -->
<!-- //********** steps to be followed********// -->
<!-- use http method get -->

<!-- router.get("/test", (req, res) => {
    res.send("welcome to wysa server")
})
use post method to Userregister

router.post("/Userregister", userController.UserRegistration)

use post method to Userlogin
router.post("/Userlogin", userController.UserLogin)
use post method to SleepRegister
router.post("/SleepRegister", auth.authentication, sleepController.SleepInfo)
My leetcode challenge [link to md file]

Question :- "https://leetcode.com/problems validate-binary-search-tree/"

Solution :- "https://leetcode.com/problems/validate-binary-search-tree/submissions/" -->
<!-- //*******************Using Javascript************//
Primary focus - API and data design, prototyping skills
var isValidBST = function(root) {
    return helper(root, -Infinity, Infinity)
};

function helper(root, min, max){
    if(!root) return true

    const valid = root.val > min && root.val < max
    return valid && helper(root.left, min, root.val) && helper(root.right, root.val, max)
}
//***************Response look like**********//

Accepted
Runtime: 80 ms
Your input
[2,1,3]
Output
true
Expected
true

I will be attempting the bonus challenge - yes

I attempted these bonus points - Yes

Database connection url -

mongodb+srv://vipulvj19234:W0Q0qCoUzZOjj6nu@cluster0.rxqi0.mongodb.net/WysaAssessment-db?authSource=admin&replicaSet=atlas-w6rrrs-shard-0&readPreference=primary&ssl=true

Code (github or other) repository -
 "https://github.com/Vipul-VijayVargiya20/Wysa_Assessement/tree/Sleepapp_wysa" -->
<!--  -->
