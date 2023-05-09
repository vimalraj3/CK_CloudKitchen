"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_data_1 = require("form-data");
var mailgun_js_1 = require("mailgun.js");
var mailgun = new mailgun_js_1.default(form_data_1.default);
var mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: process.env.MAILGUN_URL });
mg.messages.create('sandbox-123.mailgun.org', {
    from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    to: ["vimalic0011@gmail.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
    .then(function (msg) { return console.log(msg); }) // logs response data
    .catch(function (err) { return console.log(err); }); // logs any error
