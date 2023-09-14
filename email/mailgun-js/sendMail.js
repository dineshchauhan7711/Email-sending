const config = require('../config/config')
const mgCredentials = config.mailgun
const Email = require("email-templates");
const path = require("path");
const mailgun = require('mailgun-js')({ 'apiKey': mgCredentials.api_key, 'domain': mgCredentials.domain })


// ------------ ENV Credentials --------------------
// MAILGUN_DOMAIN=''
// MAILGUN_MAIL=''
// MAILGUN_KEY=''




// Load email template folder
const email = new Email({
    views: {
        root: path.resolve("views/emails"),
        options: {
            extension: "ejs"
        }
    }
});

/**
 * Send Onbording Mail
 */
async function sendOnboardingMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("activateAccount", { otp: data.verification_code });
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Welcome to Wegig',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
}

/**
 * Send Stripe account link Mail
 */
async function sendStriprAccountLinkMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("stripeMail", { link: data.verification_link });
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Welcome to Wegig Business',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
}

/**
 * Send Decline Business Account Mail
 */
async function sendDeclineBusinessMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("declineBusinessMail", { reason: data.decline_reason });
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Business account request update',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
}


/**
 * Send approved Business Account Mail
 */
async function sendapproveBusinessMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("approveBusinessMail");
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Business account request update',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
}

/**
 * Send forgot password link Mail
 */
async function sendForgotPasswordLinkMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("forgotPasswordMail", { link: data.link });
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Your Wegig password reset request',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
}

/**
 * Send invitation link Mail
 */
async function sendInvitationLinkMail(data) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("inviteMail", { link: data.link, name: data.name, referral_code: data.referral_code });
        var mailOptions = {
            from: `Wegig ${mgCredentials.email}`,
            to: data.email,
            subject: 'Invitation to join Wegig Business',
            text: templates.text,
            html: templates.html
        }
        await sendMail(mailOptions)
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
};

/**
 * Send mail
 */
async function sendMail(mailOptions) {
    try {
        mailgun.messages().send(mailOptions, async function (error, body) {
            if (error) throw error;
           
            return true
        })
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    sendOnboardingMail,
    sendStriprAccountLinkMail,
    sendDeclineBusinessMail,
    sendForgotPasswordLinkMail,
    sendInvitationLinkMail,
    sendapproveBusinessMail
}
