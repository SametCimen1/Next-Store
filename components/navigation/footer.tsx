import Link from "next/link";

export  function Footer(){
    return(
        <div className="mt-20">
        
            <footer className="rounded-lg  ">
                <div className="w-full max-w-screen-xl mx-auto md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href='/' aria-label='sprout and scribble logo'>
                            <span className="cursor-pointer font-semibold text-[#2D2E32] dark:text-[#efefef] text-lg ">
                                Next-Store
                            </span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6  sm:mx-auto lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://sametcimen.com" className="hover:underline text-blue-400">Samet</a></span>
                </div>
            </footer>

        </div>
    )
}