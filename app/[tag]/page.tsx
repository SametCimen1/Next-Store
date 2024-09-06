import { db } from "@/server";
import {products, productVariants, variantImages, variantTags } from "@/server/schema";
import { asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "lucide-react";
import formatPrice from "@/lib/format-price";

export default async function TagPage({params}: {params: {tag:string}}){
    
    const productArray = [];

    const variant = await db.query.variantTags.findMany({
        where: eq(variantTags.tag, params.tag),
        with:{
            productVariants: true 
        },
        orderBy: [desc(variantTags.id)],
    })


    for(let i = 0; i<variant.length; i++){
        const images = await db.query.variantImages.findFirst({
            where: eq(variantImages.variantID, Number(variant[i].productVariants.id)),
            orderBy: [desc(variantImages.id)],
        })
        const product = await db.query.products.findFirst({
            where: eq(products.id, variant[i].productVariants.productID),
            orderBy: [desc(products.id)],
        })

        const newObj = {
            id:variant[i].productVariants.id,
            image: images?.url,
            productID: variant[i].productVariants.productID,
            productType: variant[i].productVariants.productType,
            price: product?.price,
            title: product?.title,
        }


        productArray.push(newObj);
    }



    return (
        <div>
             {productArray.length > 0 ?
                <h1 className="text-lg font-bold"></h1>
            :
            <></>
            }
            <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3 mt-5">
                {productArray.length > 0 ? productArray.map((variant) => (
                    <Link
                        key = {variant.id}
                        href = {`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.price}&title=${variant.title}&type=${variant.productType}&image=${variant.image}`}
                        className="py-2"
                    >

                        <Image className="rounded-md pb-2" src = {variant.image ? variant.image : ""} width={720} height={480} alt = {"product image"} loading = "lazy" />
                        <div className="flex justify-between">
                            <div className="font-medium">
                                <h2>{variant.title}</h2>
                                {/* <p className="text-sm text-muted-foreground">
                                    {variant.productType}
                                </p> */}
                            </div>
                            <div>
                                {/* <Badge className="text-sm" variant={'secondary'}>
                                    {formatPrice(variant.price)}
                                </Badge> */}
                            </div>
                        </div>
                    </Link>
                ))
                    
                :
                <div className="text-2xl  w-screen h-screen absolute top-0 left-0 flex justify-center items-center -z-10">
                    <span>No products found</span>
                </div>

                }
            </main>
        </div>
    )
}