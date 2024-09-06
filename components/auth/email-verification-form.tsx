'use client'

import { newVerification } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { AuthCard } from "./auth-card";
import { FormSuccess } from "./form-sucess";
import { FormError } from "./form-error";

export const EmailVerificationForm = () => {
    const token = useSearchParams().get('token');
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleVerification = useCallback(() => {
        if(success || error) return
        if(!token){
            setError('No token found')
            return
        }
        newVerification(token).then((data) => {
            if(data.error){
                setError(data.error);
            }
            if(data.success){
                setSuccess(data.success)
                router.push('/auth/login')
            }
        })
    },[]) 
    
    useEffect(() => {
        handleVerification()
    },[])

    return(
        <AuthCard backButtonLabel="Back to login." backButtonHref="/auth/login" cardTitle="Verify your account.">
            <div className="flex flex-col w-full justify-center items-center">
                <p>{!success && !error ? "Verifying Email" : null}</p>
                <FormSuccess message={success}></FormSuccess>
                <FormError message={error}></FormError>
            </div>
        </AuthCard>
    )
}