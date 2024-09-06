'use client'


import { cn } from '@/lib/utils'
import { usePathname } from "next/navigation";
import {motion, AnimatePresence} from 'framer-motion'
import Link from 'next/link'


export default function DashboardNav({
    allLinks,
  }: {
    allLinks: { label: string; path: string; icon: JSX.Element }[]
  }) {
    
    const pathName = usePathname();

    return(
        <nav className="py-2 overflow-auto mb-4">
            <ul className = "flex gap-6 text-xs font-semibold ">
                <AnimatePresence>
                    {allLinks.map((link)=>(
                        <motion.li whileTap={{scale:0.95}} key = {link.path}>
                            <Link 
                                href = {link.path} 
                                className={cn('flex gap-1 flex-col items-center relative', pathName === link.path && 'text-primary'
                                )}>
                                    {link.icon}
                                    {link.label}
                                    {pathName === link.path ? (
                                        <motion.div 
                                            initial={{scale:0.8}} 
                                            animate={{scale:1}} 
                                            className='h-[3px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1' 
                                            layoutId='underline'
                                            transition={{type:'spring', stiffness: 50}}
                                        />

                                    ):null}
                            </Link>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </nav>
    )
}