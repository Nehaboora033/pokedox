"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Header = ({ search, setSearch }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`w-full fixed top-0 left-0 z-10 bg-white transition-all duration-300 ${scrolled ? " py-2" : "py-4"
                }`}
        >
            <div className="max-w-[1200px] px-3 mx-auto w-full">
                <div className="mt-2.5 max-w-[800px] w-full p-4 shadow-input rounded-2xl flex bg-white">
                    <input
                        type="text"
                        placeholder="Search your Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        className="w-full outline-none placeholder:text-lg placeholder:text-grey-400"
                    />
                    <div className="size-10 flex items-center justify-center cursor-pointer bg-[#ff5350] rounded-[10px] shadow-search hover:opacity-[0.8] searchhover">
                        <Search className="stroke-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;