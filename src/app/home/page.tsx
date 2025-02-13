"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQueryClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div
      className="absolute z-10 bg-darkgrayColor bg-opacity-95 text-white text-center rounded-[30px] w-[760px] h-[894px] mx-auto left-1/2 transform -translate-x-1/2"
      style={{ top: "30px" }} // Position the search section 90px from the top
    >
      <div className="p-12 mt-[200px]">
        {/* Title Section */}
        <h1 className="text-[32px] font-poppins font-extrabold leading-[40px] tracking-tight">
          <span className="font-extrabold italic">brand</span>
          <span className="text-[#6F00FF] font-extrabold italic">list</span>{" "}
          <span className="font-inter">— это</span>{" "}
          <span className="text-[#6F00FF] font-inter">поисковик</span>
          <br />
          <span className="font-inter">любимых брендов в</span>{" "}
          <br/>
          <span className="font-inter">магазинах Казахстана</span>{" "}
        </h1>

        {/* Search Input */}
        <div className="mt-6 flex justify-center items-center relative w-full max-w-[700px] mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="женские кроссовки"
            className="w-full px-8 py-5 text-lg rounded-full bg-inputColor text-white focus:outline-none placeholder-borderColor"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center"
            onClick={handleSearch}
          >
            <img src="/images/arrow.png" alt="Search" className="w-7 h-7" />
          </button>
        </div>

        {/* Popular Queries */}
        <div className="mt-8 text-gray-300">
          <p className="text-[16px] text-borderColor">Самые популярные запросы:</p>
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
                onClick={() => handleQueryClick(query)}
                className="border-2 border-borderColor px-4 py-2 rounded-full text-borderColor text-[16px] cursor-pointer hover:bg-purple-600"
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
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background Image Slider */}
        <div
          className="absolute left-0 flex items-center space-x-10 animate-gallery w-[calc(450px*6*2)]"
          style={{ top: "200px" }} 
        >
          {[...Array(3)].map((_, repeatIndex) =>
            [1, 2, 3, 4, 5, 6].map((num) => (
              <img
                key={`${repeatIndex}-${num}`}
                src={`/images/image${num}.png`}
                alt={`Image ${num}`}
                className={`w-[250px] h-[340px] rounded-[30px] object-cover ${
                  num % 2 === 0 ? "mt-40" : "mt-20"
                }`}
              />
            ))
          )}
        </div>

        {/* Search Section */}
        <SearchSection />
      </div>
    </>
  );
};

export default Home;
