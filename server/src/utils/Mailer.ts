import { NextFunction } from 'express';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { AppError } from './AppError';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username:'Cloud Kitchen', key: process.env.MAILGUN_API_KEY  });

export enum EmailTemplate{
    verification = 'foodie',
    resetPassword = 'resetpassword'
}

interface IEmailVariables{
    link: string;
    userName: string;
    webName?: string;
    supportEmail?: string;
}

export const sendEmail = async (to: string, subject: string,  template: EmailTemplate, Variables: IEmailVariables ) :Promise<boolean> => {

    const defaultEmailVariables:IEmailVariables = {
        link:Variables.link,
        userName:Variables.userName,
        
        webName: 'Cloud Kitchen',
        supportEmail: `<support@${process.env.MAILGUN_DOMAIN}>` 
    }

    const defaultEmailConfig = {
        from: `CK, Verification <verify@${process.env.MAILGUN_DOMAIN}>`,
        to: [to],
        subject,
        template,
        'h:X-Mailgun-Variables': JSON.stringify(defaultEmailVariables),
        'h:Reply-To': 'reply-to@example.com',
    }

    const sent = mg.messages.create(process.env.MAILGUN_DOMAIN, defaultEmailConfig)
    .then(msg => true)  
    .catch(err =>  false); 
    return sent;
}

