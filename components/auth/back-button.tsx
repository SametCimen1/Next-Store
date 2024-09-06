'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";


//you can also pass the types like this
type BackButtonType = {
    href: string;
    label: string
}

export const BackButton = ({href, label}: BackButtonType) => {
    return(
        <Button className="font-medium w-full" asChild variant={"link"}>
            <Link aria-label={label} href={href}>
                {label}
            </Link>
        </Button>
    )
}