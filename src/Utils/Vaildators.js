const mongoose = require("mongoose");

//  check validation for the body
const isValidBody = function (object) {
    return Object.keys(object).length > 0;
};

// check validation for the values
const isValidValue = function (value) {
    if (typeof value === "undefined" || value === null || value === 0)
        return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

//  check validation for the characters

const isValidCharacters = function (value) {
    return /^[A-Za-z]+$/.test(value);
};

//  check validation for the Valid Password

const isValidPassword = function (password) {
    const regexForPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    return regexForPass.test(password);
};

//  check validation for the Valid Time
const isValidTime = function (time) {
    const regexForTime = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    return regexForTime;
};


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
    isValidBody,
    isValidValue,
    isValidCharacters,
    isValidPassword,
    isValidObjectId,
    isValidTime,
};