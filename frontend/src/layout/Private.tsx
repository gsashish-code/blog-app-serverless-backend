import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useEffect, useState } from "react";

export default function Private() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigate();

    // Effect to track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className={`flex select-none items-center justify-between ${isScrolled ? "shadow-sm" : ""} bg-white sticky top-0  text-neutral-500`}>
                <h1 onClick={() => {
                    navigation(ROUTES.private.blog.all.pathName)
                }} className="text-sm  cursor-pointer font-bold tracking-widest p-4 uppercase">
                    THE GS ASHISH BLOG.
                </h1>
                {location.pathname === ROUTES.private.blog.all.absolute ?
                    <div onClick={() => {
                        navigation(ROUTES.private.blog.create.pathName)
                    }} className="flex items-center cursor-pointer py-2 px-3 hover:bg-neutral-100" >
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        Create Blog
                    </div> : null
                }
            </header >
            <Outlet />
        </div >
    );
}
