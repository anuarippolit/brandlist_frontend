'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [icon, setIcon] = useState('/images/arrow.png');
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQueryClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    // <div
    //   className="absolute z-10 bg-darkgrayColor bg-opacity-95 text-white text-center rounded-[30px] w-[760px] h-[680px] mx-auto left-1/2 transform -translate-x-1/2 overflow-hidden"
    //   style={{ top: "20px" }}
    // >
    <div
      className="absolute z-10 bg-darkgrayColor bg-opacity-95 text-white text-center rounded-[20px] sm:rounded-[30px] w-[94vw] sm:w-[760px] h-[83vh] sm:h-[680px] mx-auto left-1/2 transform -translate-x-1/2 overflow-hidden px-4 sm:px-10"
      style={{ top: '5vh' }}
    >
      <div className="p-10 sm:mt-[130px] mt-[90px]">
        {/* <h1 className="text-[32px] font-poppins font-normal leading-[42px] tracking-tight"> */}
        <h1 className="text-[20px] sm:text-[32px] leading-[28px] sm:leading-[42px] font-poppins font-normal tracking-tight">
          <span className="font-extrabold italic">brand</span>
          <span className="text-[#6F00FF] font-extrabold italic">
            list
          </span>{' '}
          <span className="font-inter">— это</span>{' '}
          <span className="text-[#6F00FF] font-inter">поисковик</span>
          <br /> 
          <span className="font-inter">любимых брендов в</span> <br />
          <span className="font-inter">магазинах Казахстана</span>{' '}
        </h1>

        <div className="mt-[50px] flex justify-center items-center relative w-full w-full sm:max-w-[550px] mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Напишите свой запрос"
            className="w-full px-5 py-2 text-[14px] sm:text-lg rounded-full bg-inputColor text-white focus:outline-none placeholder-borderColor"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="absolute right-4 sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] bg-purple-600 text-white rounded-full flex items-center justify-center"
            onClick={handleSearch}
            onMouseEnter={() => setIcon('/images/whitearrow.png')}
            onMouseLeave={() => setIcon('/images/arrow.png')}
          >
            <img
              src={icon}
              alt="Search"
              className="w-[12px] h-[12px] sm:w-[12px] sm:h-[12px]"
            />
          </button>
        </div> 
    
        {/* Popular Queries */}
        <div className="mt-8 text-gray-300 max-w-[550px] mx-auto">
          <p className="text-sm sm:text-[16px] text-borderColor">
            Самые популярные запросы:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {[
              'Adidas Samba',
              'Спортивные брюки',
              'Кроссовки',
              'Calvin Klein Jeans',
              'Худи',
            ].map((query, index) => (
              // <span
              //   key={index}
              //   onClick={() => handleQueryClick(query)}
              //   className="border-2 border-borderColor sm:text-[16px] sm:px-[0x] px-[28px] py-[5px] rounded-full text-borderColor text-[14px] cursor-pointer hover:bg-purple-600"
              // >
              //   {query}
              // </span>
              <span
  key={index}
  onClick={() => handleQueryClick(query)}
  className="border border-borderColor text-[13px] px-3 py-1 rounded-full text-borderColor cursor-pointer hover:bg-purple-600 transition"
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
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <Navbar />
      {/* <div className="relative w-full h-screen overflow-hidden bg-black"> */}
      <div className="relative w-full h-screen overflow-hidden bg-black max-w-screen max-h-screen">
        {/* Desktop: animated horizontal gallery */}
        <div className="hidden sm:flex absolute left-0 top-[100px] items-center space-x-[20px] animate-gallery w-[calc(450px*6*2)]">
          {[...Array(3)].map((_, repeatIndex) =>
            [1, 2, 3, 4, 5, 6].map((num) => (
              <img
                key={`${repeatIndex}-${num}`}
                src={`/images/image${num}.png`}
                alt={`Image ${num}`}
                className={`w-[250px] h-[340px] rounded-[30px] object-cover ${
                  num % 2 === 0 ? 'mt-40' : 'mt-20'
                }`}
              />
            ))
          )}
        </div>

        {/* Mobile: static 2x2 grid (2 rows × 2 columns) */}
        {/* <div className="grid sm:hidden grid-cols-2 gap-2 px-2 pt-6 mt-[0px]">
          {[1, 2, 3, 4].map((num) => (
            <img
              key={num}
              src={`/images/image${num}.png`}
              alt={`Image ${num}`}
              className="w-full h-[320px] rounded-[20px] object-cover mt-[30px]"
            />
          ))}
        </div> */}
      {/* Mobile: static 2x2 grid с анимацией */}
<div className="grid sm:hidden grid-cols-2 gap-2 px-2 pt-6 mt-[0px]">
  {/* Первый ряд — вправо */}
  <div className="col-span-2 flex space-x-2 animate-slide-right">
    {[4, 5, 6, 1, 2, 3].map((num) => (
      <img
        key={num}
        src={`/images/image${num}.png`}
        alt={`Image ${num}`}
        className="w-1/2 h-[320px] rounded-[20px] object-cover"
      />
    ))}
  </div>

  {/* Второй ряд — влево */}
  <div className="col-span-2 flex space-x-2 animate-slide-left mt-[30px]">
    {[1, 2, 4, 5, 6, 3].map((num) => (
      <img
        key={num}
        src={`/images/image${num}.png`}
        alt={`Image ${num}`}
        className="w-1/2 h-[320px] rounded-[20px] object-cover"
      />
    ))}
  </div>
</div>
        <SearchSection />
      </div>
    </>
  );
};

export default Home;
