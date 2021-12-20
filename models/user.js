const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const SECRET = require('../config').secret;
const PASS_SECRET = require('../config').pass_secret;
const { Schema } = mongoose;
const EMAIL_REGEX = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true, match: [EMAIL_REGEX, 'is invalid'], index: true },
    password: { type: String },
    profileImage: { type: String, default: null },
    blocked:{ type: Boolean, default: false },
    deleted:{ type: Boolean, default: false },
    location: {
        coordinates: { type: [Number], required:true }
    }
}, { timestamps: true });

//UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    if (this.getUpdate()) {
        const password = this.getUpdate().password;
        if (password) {
            this.getUpdate().password = bcrypt.hashSync(password, 10);
        }
        next();
    }

});

//login token
UserSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    let obj = {};
    if(this.companies.length==1){
        obj.role = this.companies[0].role;
        obj.company = this.companies[0].company._id;
    }
    exp.setDate(today.getDate() + 1); 
    return jwt.sign({
        sub: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
        ...obj
    }, SECRET);
};



//reset password token
UserSchema.methods.JWTPassToken = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 1);
    return jwt.sign({
        sub: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, PASS_SECRET);
};

UserSchema.methods.toAuthJSON = async function () {
    let result = await this.populate('companies.company').execPopulate();
    console.log("result ", result);
    let obj = {};
    if(result.companies.length==1){
        obj.role = result.companies[0].role;
        obj.company = result.companies[0].company._id;
    }
    return {
        companies: [...result.companies],
        name: this.name,
        email: this.email,
        token: this.generateJWT(),
        title: this.title,
        profileImage: this.profileImage,
        ...obj
    }
};




const Users = mongoose.model("Users", UserSchema);

module.exports = Users;