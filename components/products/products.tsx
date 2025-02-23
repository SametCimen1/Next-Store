'use client';

import { Button } from "@/components/ui/button";
import { VariantsWithProduct } from "@/lib/infer-type";
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from "../ui/badge";
import formatPrice from "@/lib/format-price";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Categories from "./categories";

type ProductTypes = {
    variants: VariantsWithProduct[]
}

export default function Products({variants}: ProductTypes){

    const params = useSearchParams();
    const paramTag = params.get('tag')

    const filtered = useMemo(() => {
        if(paramTag && variants){
            return variants.filter((variant) => variant.variantTags.some((tag) => tag.tag === paramTag))
        }
        return variants;
    }, [paramTag])

    return(
        <div className="">
            <Categories />
            {/* <h2 className="text-xl mt-20 font-semibold">
                Products
            </h2>
            <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 gap-y-10 lg:grid-cols-3 ">
                {filtered.map((variant) => (
                    <Link
                        key = {variant.id}
                        href = {`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
                        className="p-4 border" 
                    >

                        <Image className="rounded-md pb-2" src = {variant.variantImages[0].url} width={720} height={480} alt = {variant.product.title} loading = "lazy" />
                        <div className="flex justify-between">
                            <div className="font-medium">
                                <h2>{variant.product.title}</h2>
       
                            </div>
                            <div>
                                <Badge className="text-sm" variant={'secondary'}>
                                    {formatPrice(variant.product.price)}
                                </Badge>
                            </div>
                        </div>
                    </Link>
                ))}

                <div>
                    <Link href= '/products/all'>
                        <Button variant={'outline'}>Shop all</Button>
                    </Link>
                </div>
            </main> */}

            <div className="hero mt-20">
                <div className="flex lg:flex-row flex-col">
                    <img className=" w-full lg:max-w-[45%]" src = "livingroom.jpg"/>
                    <div className="flex-1 flex justify-center mt-2 mx-auto flex-col lg:w-1/2 lg:mt-0 ">
                        <div className="w-full lg:w-4/5 lg:m-auto ">
                            <h2 className="font-bold text-2xl">Elevate Your Everyday Life</h2>
                            <p className="font-medium text-muted-foreground">Next-Store offers an exceptional range of living room, kitchen, school, and computer supplies, all crafted to bring comfort and elegance into your home and workspaces. </p>
                            <Link href = "/products/all">
                                <Button variant={'outline'} className="mt-2">Shop Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}