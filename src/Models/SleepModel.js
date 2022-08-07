const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

//*************************************Prepare a schema ************************************* *//

const SleepinfoSchema = new mongoose.Schema(
    {

        userID: {
            type: ObjectId,
            required : true,
            ref: "user",
            trim:true

        },
        sleepStruggle: {
           required : true,
           trim:true,
           type : String,
           enum : [ 'Less than 2 weeks' , '2 to 8 weeks' , 'More than 8 weeks' ]
        },
        bedTime: {
            type : String,
            required : true,
            trim:true
        },
        wakeTime: {
            type : String,
            required : true,
            trim:true
        },
        sleepDuration: {
            required : true,
            trim:true,
            type: Number,
            min: 0,
            max: 24
        },
    },
    { timestamps: true },

);
module.exports = mongoose.model('SleepData', SleepinfoSchema);