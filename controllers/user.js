const bcrypt = require('bcrypt');
const User = require("../models/user");
const { validate, handleErrors } = require("../lib");
const jwt = require('jsonwebtoken');
const SECRET = require('../config').secret;
const { host } = require("../config");
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const { s3Key, s3Secret, bucketDpName } = require("../config");
const imagePath = `https://${bucketDpName}.s3.amazonaws.com/`;
const { roles } = require("../lib/roles");

exports.signup = async (req, res) => {
    try {

        // Validate parameters
        const validatePayload = validate(["email", "name", "password","coordinates"], req.body);

        if (validatePayload) {
            return res.status(400).json(validatePayload);
        }


        // Create user with Organization details along with it
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            location:{ type: "Point", coordinates: [req.body.coordinates[0], req.body.coordinates[0]] }
        });

        const savedUser = await user.save();

        return res.json(await savedUser.toAuthJSON());
    } catch (error) {
        //const { errorMessage, status } = handleErrors(error, "email");

        return res.status(400).json(error);
    }
}

exports.fetchNearestPumps = async (req, res) => {
    try {

        // Validate parameters
        const validatePayload = validate(["coordinates"], req.body);

        if (validatePayload) {
            return res.status(400).json(validatePayload);
        }


        const pumps = await Pumps.find({}).lean().exec();

        const savedUser = await user.save();

        return res.json(await savedUser.toAuthJSON());
    } catch (error) {
        //const { errorMessage, status } = handleErrors(error, "email");

        return res.status(400).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        // Validate payload values
        const validatePayload = validate(["email", "password"], req.body);
        if (validatePayload) {
            return res.status(400).json(validatePayload);
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        // check user exists or not
        if (!user) {
            return res.status(400).json({ inline_message: 'user does not exist' });
        }

        const isPasswordMatched = bcrypt.compareSync(password, user.password);

        // check if password matched
        if (!isPasswordMatched) {
            return res.status(400).json({ inline_message: 'wrong password' })
        }
        let obj = await user.toAuthJSON();
        if (obj.profileImage) {
            obj.profileImage = `${imagePath}${obj.profileImage}`;
        }

        return res.json(obj);
    } catch (error) {
        const { errorMessage, status } = handleErrors(error, "email");

        return res.status(status).json(errorMessage);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const file = req.file;


        if (file) {
           
        }


    } catch (error) {
        const { errorMessage, status } = handleErrors(error);

        return res.status(status).json(errorMessage);
    }

}









