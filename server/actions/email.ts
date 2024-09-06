'use server';

import getBaseUrl from '@/lib/base-url'
import {Resend} from 'resend' 

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();

export const sendVerificationEmail = async(email:string, token:string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sproud and Scribble - Confirmation Email',
        html: `<p>Click to <a href = '${confirmLink}'>confirm your email</a></p>`
    });

    if (error) return console.log(error)
    if (data)  return data;
}

export const sendPasswordResetEmail = async(email:string, token:string) => {
    const confirmLink = `${domain}/auth/new-password?token=${token}`
    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sproud and Scribble - Confirmation Email',
         html: `<p>Click here to <a href = '${confirmLink}'> Reset your password</a></p>`
    });

    if (error) return console.log(error)
    if (data)  return data;
}



export const sendTwoFactorTokenByEmail = async(email:string, token:string) => {
    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Sproud and Scribble - Your 2 factor token',
        html: `<p>Your confirmation code is ${token}</p>`
    });

    if (error) return console.log(error)
    if (data)  return data;
}