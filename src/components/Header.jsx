
import { Search } from "lucide-react";

const Header = ({ search, setSearch }) => {
    return (
                <div className="p-4 m-3 shadow-input rounded-2xl flex bg-white sticky top-0 z-10">
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
    );
};

export default Header;