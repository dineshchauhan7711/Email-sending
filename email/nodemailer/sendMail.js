var nodemailer = require("nodemailer");
const config = require('../config/config')
const Email = require("email-templates");
const path = require('path');


// ---------- ENV credentials ------------
// EMAIL=""
// PASSWORD=""



// Load email template folder
const emailTemplate = new Email({
    views: {
        root: path.resolve("views/emails"),
        options: {
            extension: "ejs"
        }
    }
});

var mailService = async (to, sub, html) => {
    var response = { success: true }
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            auth: {
                user: config.email,
                pass: config.password,
            },
        });
        let mailOption = {
            from: config.email,
            to: to,
            subject: sub,
            html: html,
        };
        await transporter.sendMail(mailOption);
    } catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
};


module.exports = { mailService, emailTemplate };
