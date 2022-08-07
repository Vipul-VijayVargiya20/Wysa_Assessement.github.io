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

//  check validation for the emailID

const isValidEmail = function (email) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexForEmail.test(email);
};

//  check validation for the Phone Number
const isValidPhone = function (phone) {
    const regexForMobile = /^[6-9]\d{9}$/;
    return regexForMobile.test(phone);
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

//  check validation for the Number
const isValidNumber = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (
        typeof value === "string" &&
        value.trim().length > 0 &&
        Number(value) !== NaN
    )
        return true;
    if (typeof value === "number") return true;
    return false;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
    isValidBody,
    isValidValue,
    isValidCharacters,
    isValidEmail,
    isValidPhone,
    isValidPassword,
    isValidNumber,
    isValidObjectId,
    isValidTime,
};