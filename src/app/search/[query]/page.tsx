'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import ProductGrid from '@/components/ProductGrid';
import { useRouter } from 'next/navigation';

const LIMIT = 20;

const SearchResults = ({ params }: { params: Promise<{ query: string }> }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string | null>(null);
  const [newQuery, setNewQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [icon, setIcon] = useState('/images/arrow.png');

  useEffect(() => {
    const init = async () => {
      const resolvedParams = await params;
      const searchQuery = decodeURIComponent(resolvedParams.query || '');
      setQuery(searchQuery);
      setNewQuery(searchQuery);
      setProducts([]);
      setOffset(0);
      setHasMore(true);
    };
    init();
  }, [params]);

  const fetchMoreProducts = useCallback(async () => {
    if (!query || isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/chat/send?message=${encodeURIComponent(
          query
        )}&offset=${offset}&limit=${LIMIT}`
      );
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      const data = await response.json();
      const newProducts = data.products || [];

      setProducts((prev) => [
        ...prev,
        ...newProducts.map((p: any) => ({
          ...p,
          onClick: () => router.push(`/search/${query}/${p.id}`),
        })),
      ]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(data.has_more);
    } catch (err) {
      console.error('❌ Fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [query, offset, isLoading, hasMore, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreProducts();
        }
      },
      { threshold: 1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchMoreProducts]);

  const handleSearch = () => {
    if (newQuery.trim()) {
      router.push(`/search/${encodeURIComponent(newQuery)}`);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-inter font-normal pb-[20px]">
      <Navbar />
      <Breadcrumb
        breadcrumbs={[
          { label: 'Поиск', href: '/home' },
          { label: query || '...' },
        ]}
      />
      <main className="px-8">
        <div className="mt-[20px] flex justify-center items-center relative w-full max-w-[950px] mx-auto">
          <input
            type="text"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            placeholder="Напишите свой запрос"
            className="w-full pl-7 pr-14 py-4 text-[20px] sm:text-lg rounded-full bg-inputColor font-[500] text-white focus:outline-none placeholder-borderColor"
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

        <div className="flex flex-col items-center gap-4 mt-6 mb-6">
          {products.length > 0 && <ProductGrid products={products} />}

          {!isLoading && products.length === 0 && (
            <div className="text-center font-[500] font-inter text-white text-[16px] sm:text-[20px] px-8 mt-20">
              <p>Прости но я ничего не нашел 🥲,</p>
              <p>попробуй написать по проще пожалуйста</p>
            </div>
          )}

          {isLoading && (
            <div className="w-[240px] h-[32px] overflow-hidden relative mt-20">
              <div className="animate-marquee whitespace-nowrap absolute top-0 left-0">
                <span className="text-[24px]">🧥👖👗👔👟👠🧢🧤👛🎒</span>
                <span className="text-[24px] ml-4">🧥👖👗👔👟👠🧢🧤👛🎒</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>
          )}
          {hasMore && <div ref={loaderRef} className="h-10 w-full" />}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
