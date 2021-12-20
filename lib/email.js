const AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { email_from,email_secret } = require("../config");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_from,
        pass: email_secret
    }
});

module.exports.sendEmail = async (to, subject, template, context) => {
    const dirPath = path.join(__dirname, '../emails/');
    const options = {
        viewEngine: {
            extname: '.handlebars', // handlebars extension
            layoutsDir: dirPath, // location of handlebars templates
            defaultLayout: template, // name of main template
            partialsDir: dirPath, // location of your subtemplates aka. header, footer etc
        },
        viewPath: dirPath
    }
    transporter.use('compile', hbs(options));


    var mailOptions = {
        from: email_from,
        to: to,
        subject: subject,
        template: template,
        context: context
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info.response);
        }
    });

}
