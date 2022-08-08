const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("../Utils/Vaildators");
const UserModel = require("../Models/UserModel");

//********************************************* Store User Data ********************************************************************************************************** *//

const UserRegistration = async function (req, res) {
    try {
//***********************************************key-value pairs of data submitted in the request body*********************************************//
        const requestBody = req.body; 
//*********************************************** query parameters can be retrieved from the query object on the request object *******************//
        const queryParams = req.query;



        if (Validator.isValidBody(queryParams)) {
            return res.status(404).send({
                status: false,
                message: "Page not found"
            });
        }

        if (!Validator.isValidBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: "User data is required for registration",
            });
        }
        // ****************************************  Use Object Destructuring      ******************************************************* *//

       const {nickname, password}  = requestBody;



        // ****************************** Check Validaton **********************************************************************************//

        if (!Validator.isValidValue(nickname)) {
            return res.status(400).send({
                status: false,
                message: "nick name is required ",
            });
        }

        if (!Validator.isValidCharacters(nickname)) {
            return res.status(400).send({
                status: false,
                message: "Only alphabets allowed ",
            });
        }

     
        // ****************************** check for isUnique nickname ************************************************************//
        const isUniquenickname= await UserModel.findOne({
            nickname  
        });

        if (isUniquenickname) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "nickname  already exist"
                });
        }

    
        // ****************************** check for isUniquephoneNumber ***************************************************************//
       

        if (!Validator.isValidValue(password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "password is required"
                });
        }

        if (!Validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message: "password should be of 8 to 15 characters and  must have 1 letter and 1 number",
            });
        }
        // ****************************** encrpyt password ****************************************************************************************//

        const salt_round = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hash(password, salt_round);

        const userData = {
            nickname: nickname.trim(),
            
            password: encryptedpassword,
        };

        const newUser = await UserModel.create(userData);

        res.status(201).send({
            status: true,
            message: "User successfully registered",
            data: newUser,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

/************************************************************** Log In *********************************************************************************/
const UserLogin = async function (req, res) {
    try {
        const queryParams = req.query;
        const requestBody = req.body;


        if (Validator.isValidBody(queryParams)) {
            return res.status(404).send({
                status: false,
                message: "Page not found"
            });
        }

        if (!Validator.isValidBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: "User data is required for login",
            });
        }

        const nickname = requestBody.nickname;
        const password = requestBody.password;

        if (!Validator.isValidValue(nickname)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "nickname is required"
                });
        }

      

        if (!Validator.isValidValue(password)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "password is required"
                });
        }

        if (!Validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message: "Enter password of 8 to 15 characters and must contain one letter and digit ",
            });
        }
        // ****************************** find Userdetails in database *************************************************************//
        const userDetails = await UserModel.findOne({
            nickname: nickname
        });

        if (!userDetails) {
            return res
                .status(404)
                .send({
                    status: false,
                    message: "No user found by nickname"
                });
        }

        const ispasswordMatching = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!ispasswordMatching) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "incorrect password"
                });
        }


        const Payload = {
            userId: userDetails._id
        };
        const Expiry = {
            expiresIn: "3h"
        };
        const SecretKey = "2695ccmekm25656nsknk26xwbhb";
// ****************************** Synchronously sign the given payload into a JSON Web Token string***************************//
        const token = jwt.sign(Payload, SecretKey, Expiry);


        res.header("Authorization", "Bearer " + token);

        const data = {
            userId: userDetails._id,
            token: token
        };

        res
            .status(200)
            .send({
                status: true,
                message: "login successful",
                data: data
            });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};



module.exports = {
    UserRegistration,
    UserLogin
}