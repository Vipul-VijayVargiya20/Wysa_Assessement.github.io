const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required : true,
            maxlength: 32
        },
        lastName: {
            type: String,
            maxlength: 32
        },
        emailID: {
            type: String,
            required : true,
            trim: true
            
        },
        password: {
            type: String,
            required : true,
        },
        phoneNumber: {
            type: String,
            required : true,
        },
    },
    { timestamps: true },

);

module.exports = mongoose.model('User', UserSchema);
