import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username:'Cloud Kitchen', key: process.env.MAILGUN_API_KEY  });

export enum EmailTemplate{
    verification = 'foodie'
}

export const sendEmail = async (to: string, subject: string, link:string, template: string, userName:string) => {
    mg.messages.create('mail.dctro.shop', {
        from: "CK, Verification <support@mail.dctro.shop>",
        to: [to],
        subject,
        template ,
        'h:X-Mailgun-Variables': JSON.stringify({  
          link,
          userName
        }),
        'h:Reply-To': 'reply-to@example.com',
    })
    .then(msg => console.log(msg))  
    .catch(err => console.log(err)); 
}

