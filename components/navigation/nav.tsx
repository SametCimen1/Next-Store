import { auth } from '@/server/auth'
import { UserButton } from './user-button';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';
import CartDrawer from '../cart/cart-drawer';

export default async function Nav(){
    const session = await auth();


        return(
            <header className=' py-8 z-50'>
                <nav className=''>
                    <ul className='flex  justify-between items-center md:gap-8 gap-4 md:flex-row'>
                        <li className='flex w-40 md:flex-1 lg:w-full'>
                            <Link href='/' aria-label=' and scribble logo'>
                                <span className="cursor-pointer font-semibold text-[#2D2E32] dark:text-[#efefef] text-2xl ">
                                    Next-Store  
                                </span>
                            </Link>
                        </li>
                        <div className='flex items-center gap-4'>
                            <li className='relative flex items-center hover:bg-muted py-1 rounded-md'>
                                <CartDrawer />
                            </li>
                            {!session ? (
                                <li className='flex items-center justify-center'>
                                    <Button asChild>
                                        <Link className='flex gap-2' href = "/auth/login">
                                            <LogIn size={20}/>
                                            <span>Login</span>
                                        </Link>
                                    </Button>
                                </li>
                            ):(
                                <li className='flex items-center justify-center'>
                                    <UserButton expires={session?.expires} user = {session?.user}/>
                                </li>
                            )}
                        </div>
                    </ul>
                </nav>
            </header>
        )
}