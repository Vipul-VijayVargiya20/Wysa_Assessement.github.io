const SleepModel = require('../models/SleepModel')
const Validator = require('../Utils/Vaildators');



const SleepInfo = async (req, res) => {
    try {
//*****************************************************key-value pairs of data submitted in the request body************************************************//
        const data = req.body;    
// ******************************  check for token in body ************************************************************************************//                    
        const decodedToken = req.decodedToken 
// ******************************query parameters can be retrieved from the query object on the request object************************************************//
        const queryParams = req.query;

        
       
        if (Validator.isValidBody(queryParams)) {
            return res.status(404).send({ status: false, message: "Page not found" });
        }
        
        if (!Validator.isValidBody(data)) {
            return res.status(400).send({ status: false, message: "User data is required for registration", });
        }
        
//                             Use  Destructuring                       //
        const { userID, sleepStruggle, bedTime, wakeTime, sleepDuration } = data
        let checkAlReadyExist = await SleepModel.findOne({_id : userID})
        if(checkAlReadyExist){
            return res.status(400).send({ status: false, message: "Data Already Exist", });

        }
        
        if (decodedToken.userId != userID) {
            return res.status(403).send({ msg: "unAuthorized Person" })
        }

        if (!Validator.isValidValue(userID)) {
            return res.status(400).send({ status: false, message: "userId is Required" });
        }
        if (!sleepStruggle) {
            return res.status(400).send({ status: false, message: "sleepStruggle is Required" });
        }

        let sleepStruggleFrom = ['', 'Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks']

        let sleepStruggleDuration = sleepStruggleFrom[sleepStruggle]

        if (sleepStruggleDuration == undefined || sleepStruggleDuration == '') {
            return res.status(404).send({ msg: "Please provide the Input from  (1,2,3) | 1 => Less than 2 weeks | 2 => 2 to 8 weeks | 3 => More than 8 weeks" })
        }


        if (!Validator.isValidValue(bedTime)) {
            return res.status(400).send({ status: false, message: "bedTime is Required" });

        }
        if (!Validator.isValidTime(bedTime)) {
            return res.status(404).send({ status: false, message: "Please use that format for time  HH:MM " });
        }

        if (!Validator.isValidValue(wakeTime)) {
            return res.status(400).send({ status: false, message: "wakeTime is Required" });
        }
        if (!Validator.isValidTime(wakeTime)) {
            return res.status(404).send({ status: false, message: "Please use that format for time  HH:MM " });
        }

        if (!(sleepDuration)) {
            return res.status(400).send({ status: false, message: "sleepDuration is Required" });
        }
        if (!(sleepDuration >= 0 || sleepDuration <= 24)) {
            return res.status(400).send({ status: false, message: "sleepDuration is between 0-24  " });
        }


        let finalData = {
            userID: userID.trim(),
            sleepStruggle: sleepStruggleDuration,
            bedTime: bedTime.trim(),
            wakeTime: wakeTime.trim(),
            sleepDuration: sleepDuration

        }
        const sleepinfo = await SleepModel.create(finalData)
        return res.status(201).send({ status: true, data: sleepinfo })

    }
    catch (err) {
        return res.status(500).send({ err: err.message })
    }

}



module.exports.SleepInfo = SleepInfo