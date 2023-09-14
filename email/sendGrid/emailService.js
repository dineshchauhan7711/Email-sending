const config = require('../config/config');
const Email = require("email-templates");
const path = require("path");
const sgMail = require('@sendgrid/mail')


//----------- ENV - Sandgrid_Credential ------------------ 
// SENDGRID_API_KEY=""
// SENDGRID_EMAIL=""
// SENDGRID_PASSWORD=""

const email = new Email({
    views: {
        root: path.resolve("views/emails"),
        options: {
            extension: "ejs"
        }
    }
});

sgMail.setApiKey(config.SendGrid.secret_key);

async function sendMail(data, path) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("activateAccount", { path: path, otp: data.verification_code });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Welcome to Wegig',
            html: templates.html
        };
        sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
    } catch (error) {
        console.log(error);
        response.success = false
    }
    finally {
        return response
    }


}

/**
 * Send Stripe account link Mail
 */
async function sendStriprAccountLinkMail(data, path) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("stripeMail", { path: path, link: data.verification_link });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Welcome to Wegig Business',
            html: templates.html
        };
        await sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
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
async function sendDeclineBusinessMail(data, path) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("declineBusinessMail", { path: path, reason: data.reason });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Business account request update',
            html: templates.html
        };
        await sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
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
async function sendapproveBusinessMail(data, path) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("approveBusinessMail", { path: path });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Business account request update',
            html: templates.html
        };
        await sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
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
        const templates = await email.renderAll("forgotPasswordMail", { path: data.path, link: data.link });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Your Wegig password reset request',
            html: templates.html
        };
        await sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
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
async function sendInvitationLinkMail(data, path) {
    var response = { success: true }
    try {
        const templates = await email.renderAll("inviteMail", { path: path, link: data.link, name: data.name, referral_code: data.referral_code });
        const msg = {
            to: data.email,
            from: config.SendGrid.SendGrid_email,
            subject: 'Invitation to join Wegig Business',
            html: templates.html
        };
        await sgMail.send(msg).then((response) => {
            console.log("email send successfully.")
        })
            .catch((error) => {
                console.error(error)
            })
    }
    catch (e) {
        console.log(e);
        response.success = false
    }
    finally {
        return response
    }
};

module.exports = { sendMail, sendStriprAccountLinkMail, sendDeclineBusinessMail, sendapproveBusinessMail, sendForgotPasswordLinkMail, sendInvitationLinkMail };


