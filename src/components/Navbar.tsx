
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-16 px-8 bg-black text-white">
      
      <div className="flex items-center text-2xl font-bold ml-96">
      <h1 className="text-[32px] font-poppins font-extrabold leading-[52px] tracking-tight">
        <span className="font-extrabold italic">brand</span>
        <span className="text-[#6F00FF] font-extrabold italic">list</span>{" "} </h1>
      </div>
    
      <div className="flex items-center gap-4 mr-96">
      <Link href="/favorites" passHref>
          <img
            src="/images/heart.png"
            alt="Favorites"
            className="w-8 h-8 cursor-pointer"
          />
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;