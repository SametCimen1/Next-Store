'use client';

import { Form, FormField, FormLabel,FormControl, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { AuthCard } from "./auth-card";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import * as z from 'zod';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

import {useAction} from 'next-safe-action/hooks'
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-sucess";
import { FormError } from "./form-error";
import { newPassword } from "@/server/actions/new-password";
import { ResetSchema } from "@/types/reset-schema";
import { reset } from "@/server/actions/password-reset";


export const ResetForm = () => {

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{
            email:""
        }
    });

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const {execute, status, result} =  useAction(reset, {
        onSuccess(data){
            if(data?.error) setError(data.error);
            if(data?.success) setSuccess(data.success);
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        execute(values);
    }

    return(
        <AuthCard 
            cardTitle="Forgot your password?"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>

                            <FormLabel>Password</FormLabel>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel />
                                    <FormControl>
                                    <Input {...field} placeholder="email@email.com" disabled={status === 'executing'} type='email' autoComplete="email"/>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormSuccess message = {success}/>
                             <FormError message = {error}/>
                            <Button size = {'sm'} variant={'link'} asChild>
                                <Link href = "/auth/reset">
                                    Forgot your password?
                                </Link>
                            </Button>

                        </div>

                        <Button type ='submit' className={cn('w-full', status === 'executing' ? 'animate-pulse' : "")}>
                            {"Reset Password"}
                        </Button>

                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}