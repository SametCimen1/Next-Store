'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {FaGithub} from 'react-icons/fa'


export default function Socials(){
    return(
        <div className="flex flex-col items-center w-full gap-4">
            <Button variant={'outline'} className="flex gap-4 w-full" onClick={() => signIn('github', {
                redirect:false,
                callbackUrl:'/'
            })}>
                <p>Signin with Github</p>
                <FaGithub  className="w-5 h-5"/>
            </Button>
        </div>
    )
}