import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Categories(){
    const data = [
        {
            url:'/livingroom.jpg', 
            text: "Living Room"
        },
        {
            url:'/kitchen.jpg', 
            text: "Kitchen"
        },
        {
            url:'/computer.jpg', 
            text: "Tech"
        },
        {
            url:'/school.jpg', 
            text: "School"
        }
    ];

    const getIndex = (index:number) => {
        if(index === 0)
            return "grid-one"
        if(index === 1)
            return "grid-two"
        if(index === 2)
            return "grid-four"
        if(index === 3)
            return "grid-four-low" 
    }

    return (
        <div className="mt-10">
            <h2 className="text-xl mb-0 font-semibold">
                Categories
            </h2>
            <div className="grid-container mt-0  max-h-[30rem] ">
                {data.map((obj, index) => (
                    
                    <a href={`/${obj.text.replace(/ /g, '')}`} key = {index} className={cn('relative cursor-pointer', getIndex(index))}>
                        <div className="relative w-full h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url(${obj.url})`}}>
        
                        </div>
                        <p className="absolute bottom-0 text-white text-2xl font-bold left-1  w-full">{obj.text}</p>
                    </a >
                ))}
            </div>
        </div>
    ) 
}   