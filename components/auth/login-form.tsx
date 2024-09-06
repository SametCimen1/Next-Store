'use client';

import { Form, FormField, FormLabel,FormControl, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { AuthCard } from "./auth-card";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginSchema} from '@/types/login-schema'
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { emailSignin } from "@/server/actions/email-signin";
import {useAction} from 'next-safe-action/hooks'
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-sucess";
import { FormError } from "./form-error";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"


export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
            code: "",
        }
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const {execute, status, result} =  useAction(emailSignin, {
        onSuccess(data){
            if(data?.error) setError(data.error);
            if(data?.success) setSuccess(data.success);
            
            if(data.twoFactor) setShowTwoFactor(true);
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        execute(values);
    }

    return(
        <AuthCard 
            cardTitle="Welcome Back!"
            backButtonHref="/auth/register"
            backButtonLabel="create a new account"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            {showTwoFactor && (
                             <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sent a two factor code to your email</FormLabel>
                                    <FormLabel />
                                    <FormControl>
                                    
                                    <InputOTP
                                        disabled={status === "executing"}
                                        {...field}
                                        maxLength={6}
                                        >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                        </InputOTP>

                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            )}

                            {!showTwoFactor && (                            
                                <>
                                <FormLabel>Email</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel />
                                        <FormControl>
                                            <Input {...field} placeholder="user@gmail.com" type='email' autoComplete="email"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormLabel>Password</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel />
                                        <FormControl>
                                            <Input {...field} placeholder="**********" type='password' autoComplete="current-password"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </>
                            )}

                             <FormSuccess message = {success}/>
                             <FormError message = {error}/>
                            <Button className="px-0" size = {'sm'} variant={'link'} asChild>
                                <Link href = "/auth/reset">
                                    Forgot your password?
                                </Link>
                            </Button>

                        </div>

                        <Button type ='submit' className={cn('w-full my-4', status === 'executing' ? 'animate-pulse' : "")}>
                            {showTwoFactor ? "Verify" : "Sign In"}
                        </Button>

                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}