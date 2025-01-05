"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryClick = (query: string) => {
    setSearchQuery(query); // Update the search bar value
  };

  return (
    <div className="relative z-10 text-white text-center">
      {/* Search Block */}
      <div className="bg-black bg-opacity-80 p-24 rounded-[30px] w-[95%] max-w-[900px] mx-auto">
        <h1 className="text-[40px] font-poppins font-extrabold leading-[52px] tracking-tight">
          <span className="font-extrabold italic">brand</span>
          <span className="text-[#6F00FF] font-extrabold italic">list</span>{" "}
          <span className="font-inter">— это</span>{" "}
          <span className="text-[#6F00FF] font-inter">поисковик</span>
          <br />
          любимых брендов в магазинах Казахстана
        </h1>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center items-center relative w-full max-w-[700px] mx-auto">
          <input
            type="text"
            value={searchQuery} // Controlled input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="женские кроссовки"
            className="w-full px-8 py-5 text-lg rounded-full bg-gray-900 text-white focus:outline-none placeholder-gray-400"
          />
          <button className="absolute right-2 w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center">
            <img src="/images/arrow.png" alt="Search" className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Queries */}
        <div className="mt-10 text-gray-300">
          <p className="text-lg">Самые популярные запросы:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {[
              "Adidas Samba",
              "Пальто на осень",
              "Шорты Nike",
              "Pandora",
              "Женские сапоги",
            ].map((query, index) => (
              <span
                key={index}
                onClick={() => handleQueryClick(query)} // Handle click event
                className="bg-gray-700 px-4 py-2 rounded-full text-white text-m cursor-pointer hover:bg-purple-600"
              >
                {query}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden flex justify-center items-center bg-black">
        {/* Scrolling Gallery */}
        <div className="absolute top-20 left-0 flex items-center space-x-10 animate-gallery w-[calc(450px*6*2)]">
          {[...Array(3)].map((_, repeatIndex) =>
            [1, 2, 3, 4, 5, 6].map((num) => (
              <img
                key={`${repeatIndex}-${num}`}
                src={`/images/image${num}.png`}
                alt={`Image ${num}`}
                className={`w-[450px] h-[550px] rounded-[30px] object-cover ${
                  num % 2 === 0 ? "mt-40" : "mt-20"
                }`}
              />
            ))
          )}
        </div>

        {/* Content */}
        <SearchSection />
      </div>
    </>
  );
};

export default Home;
