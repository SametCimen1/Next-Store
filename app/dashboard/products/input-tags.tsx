'use client';

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import {AnimatePresence, motion} from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


type InPutTagsProps = InputProps & {
    value: string[],
    onChange: Dispatch<SetStateAction<String[]>>
}

export const InputTags = forwardRef<HTMLInputElement, InPutTagsProps>(({onChange, value, ...props}, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");
    const [focused, setFocused] = useState(false);

    function addPendingDataPoint(){
        if(pendingDataPoint){
            const newDataPoints = new Set([...value, pendingDataPoint])
            onChange(Array.from(newDataPoints))
            setPendingDataPoint("");
        }
    }

    const {setFocus} = useFormContext();

    return(
        <div
            className={cn("flex min-h-[40px] w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", focused ? "ring-offset-2 outline-none ring-ring ring-2" : "ring-offset-0 outline-none ring-ring ring-0")}
            onClick={() => setFocus('tags')}>

            <motion.div className="rounded-md min-h-[20px] p-2 flex gap-2 flex-wrap items-center">
                <AnimatePresence>
                    {value.map((tag) => (
                        <motion.div animate={{scale:1}} initial={{scale:0}} exit ={{scale:0}} key = {tag}>
                            <Badge variant={'secondary'}>{tag}</Badge>
                            <button className="w-3 ml-2" onClick={() => onChange(value.filter((i) => i!==tag))}>
                                <XIcon className="w-3"/>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="flex">
                    <Input
                        className="focus-visible:border-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        value = {pendingDataPoint}
                        onFocus={() => setFocused(true)}
                        placeholder="Add tags"
                        onBlurCapture = {() => setFocused(false)}
                        onChange={(e) => setPendingDataPoint(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                e.preventDefault();
                                addPendingDataPoint();
                            }
                            if(e.key === "Backspace" && !pendingDataPoint && value.length > 0){
                                e.preventDefault();
                                const newValue = [...value];
                                newValue.pop();
                                onChange(newValue)
                            }
                        }}
                        {...props}
                    />
                </div>
            </motion.div>
        </div>
    )
})

InputTags.displayName = "InputTags";