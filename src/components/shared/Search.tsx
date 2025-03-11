// 'use client'
// import { useState } from 'react';
// import { Input } from '@/components/ui';
// import Image from 'next/image';

// interface SearchProps {
//     setSearchQuery: (value: string) => void;
// }
// const Search = ({ setSearchQuery }: SearchProps) => {
//     const [searchValue, setSearchValue] = useState("");

//     const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setSearchQuery(searchValue)
//     }
//     return (
//         <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
//             <Image
//                 src="/assets/icons/search.svg"
//                 width={24}
//                 height={24}
//                 alt="search"
//             />
//             <form onSubmit={querySubmit}>

//                 <Input
//                     type="text"
//                     placeholder="Search..."
//                     className="explore-search "
//                     value={searchValue}
//                     onChange={(e) => { setSearchValue(e.target.value) }}
//                 />
//             </form>
//         </div>
//     )
// }

// export default Search


"use client";
import { useState } from "react";
import { Input } from "@/components/ui";
import Image from "next/image";

interface SearchProps {
    setSearchQuery: (value: string) => void;
}

const Search = ({ setSearchQuery }: SearchProps) => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value); 
        setSearchQuery(value); 
    };

    return (
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
            <Image
                src="/assets/icons/search.svg"
                width={24}
                height={24}
                alt="search"
            />
            <Input
                type="text"
                placeholder="Search..."
                className="explore-search"
                value={searchValue}
                onChange={handleChange} 
            />
        </div>
    );
};

export default Search;
