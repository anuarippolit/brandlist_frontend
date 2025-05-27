// 'use client';

// import React, { useState, useEffect } from 'react';
// import Navbar from '@/components/Navbar';
// import Breadcrumb from '@/components/Breadcrumb';
// // import FilterBar from '@/components/FilterBar';
// import ProductGrid from '@/components/ProductGrid';
// import { useRouter } from 'next/navigation';

// const SearchResults = ({ params }: { params: Promise<{ query: string }> }) => {
//   const router = useRouter();
//   const [query, setQuery] = useState<string | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalCount, setTotalCount] = useState<number>(0);
//   const limit = 20;

//   const totalPages = Math.ceil(totalCount / limit);

//   useEffect(() => {
//     const init = async () => {
//       const resolvedParams = await params;
//       const searchQuery = decodeURIComponent(resolvedParams.query || '');
//       setQuery(searchQuery);
//       fetchFilteredProducts({ name: searchQuery }, 1);
//     };
//     init();
//   }, [params]);

//   const fetchFilteredProducts = async (
//     filters: Record<string, string>,
//     page: number = 1
//   ) => {
//     setIsLoading(true);
//     try {
//       const searchText = filters.name;

//       const response = await fetch(
//         `http://localhost:8000/chat/send?message=${encodeURIComponent(
//           searchText
//         )}`
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `HTTP Error! Status: ${response.status} - ${errorText}`
//         );
//       }

//       const data = await response.json();
//       console.log('AI Search Results:', data);

//       setProducts(
//         (data || []).map((product: any) => ({
//           ...product,
//           onClick: () => router.push(`/search/${searchText}/${product.id}`),
//         }))
//       );

//       setTotalCount(data.length);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error('AI fetch error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-screen font-inter font-normal pb-[20px]">
//       <Navbar />
//       <Breadcrumb
//         breadcrumbs={[
//           { label: 'Поиск', href: '/home' },
//           { label: query || '...' },
//         ]}
//       />
//       <main className="px-8">
//         <h1 className="text-[35px] font-normal mb-6 ml-4 sm:ml-[340px] mt-[10px]">
//           {query}
//         </h1>

//         {/* <FilterBar
//           query={query}
//           onApplyFilters={(filters, page = 1) =>
//             fetchFilteredProducts(filters, page)
//           }
//         /> */}

//         {isLoading ? (
//           <p className="text-gray-400 text-center mt-6">Загружается...</p>
//         ) : products.length > 0 ? (
//           <>
//             <ProductGrid products={products} />

//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 border rounded text-white border-borderColor"
//                   disabled={currentPage === 1}
//                   onClick={() =>
//                     fetchFilteredProducts(
//                       { name: query || '' },
//                       currentPage - 1
//                     )
//                   }
//                 >
//                   ← Назад
//                 </button>
//                 <span className="text-white">
//                   Страница {currentPage} из {totalPages}
//                 </span>
//                 <button
//                   className="px-4 py-2 border rounded text-white border-borderColor"
//                   disabled={currentPage === totalPages}
//                   onClick={() =>
//                     fetchFilteredProducts(
//                       { name: query || '' },
//                       currentPage + 1
//                     )
//                   }
//                 >
//                   Вперёд →
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-400 text-center mt-6">Ничего не найдено.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default SearchResults;

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Navbar from '@/components/Navbar';
// import Breadcrumb from '@/components/Breadcrumb';
// import ProductGrid from '@/components/ProductGrid';
// import { useRouter } from 'next/navigation';

// const LIMIT = 20;

// const SearchResults = ({ params }: { params: Promise<{ query: string }> }) => {
//   const router = useRouter();
//   const [query, setQuery] = useState<string | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const init = async () => {
//       const resolvedParams = await params;
//       const searchQuery = decodeURIComponent(resolvedParams.query || '');
//       setQuery(searchQuery);
//       setProducts([]);
//       setOffset(0);
//       setHasMore(true);
//     };
//     init();
//   }, [params]);

//   const fetchMoreProducts = useCallback(async () => {
//     if (!query || isLoading || !hasMore) return;
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_URL
//         }/chat/send?message=${encodeURIComponent(
//           query
//         )}&offset=${offset}&limit=${LIMIT}`
//       );

//       if (!response.ok) throw new Error(`Failed: ${response.status}`);

//       const data = await response.json();
//       const newProducts = data.products || [];

//       setProducts((prev) => [
//         ...prev,
//         ...newProducts.map((p: any) => ({
//           ...p,
//           onClick: () => router.push(`/search/${query}/${p.id}`),
//         })),
//       ]);
//       setOffset((prev) => prev + LIMIT);
//       setHasMore(data.has_more);
//     } catch (err) {
//       console.error('Fetch failed:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [query, offset, isLoading, hasMore, router]);

//   useEffect(() => {
//     console.log('🔍 API URL:', process.env.NEXT_PUBLIC_API_URL);
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           fetchMoreProducts();
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [fetchMoreProducts]);

//   return (
//     <div className="bg-black text-white min-h-screen font-inter font-normal pb-[20px]">
//       <Navbar />
//       <Breadcrumb
//         breadcrumbs={[
//           { label: 'Поиск', href: '/home' },
//           { label: query || '...' },
//         ]}
//       />
//       <main className="px-8">
//         <h1 className="text-[35px] font-normal mb-6 ml-4 sm:ml-[340px] mt-[10px]">
//           {query}
//         </h1>

//         {products.length > 0 ? (
//           <>
//             <ProductGrid products={products} />
//             <div ref={loaderRef} className="h-10 col-span-full" />
//             {isLoading && (
//               <p className="text-gray-400 text-center mt-6">Загружается...</p>
//             )}
//           </>
//         ) : isLoading ? (
//           <p className="text-gray-400 text-center mt-6">Загружается...</p>
//         ) : (
//           <p className="text-gray-400 text-center mt-6">Ничего не найдено.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default SearchResults;

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
  const [products, setProducts] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = async () => {
      const resolvedParams = await params;
      const searchQuery = decodeURIComponent(resolvedParams.query || '');
      console.log('🔍 Initial query from params:', searchQuery);
      setQuery(searchQuery);
      setProducts([]);
      setOffset(0);
      setHasMore(true);
    };
    init();
  }, [params]);

  const fetchMoreProducts = useCallback(async () => {
    if (!query || isLoading || !hasMore) return;
    console.log('🔥 fetchMoreProducts triggered');
    console.log('📦 Query:', query, 'Offset:', offset);

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
      console.log('✅ Fetched products:', newProducts.length);

      setProducts((prev) => [
        ...prev,
        ...newProducts.map((p: any) => ({
          ...p,
          //onClick: () => router.push(`/search/${query}/${p.id}`),
          onClick: () => {
            console.log(
              '🧭 Navigating to detail page:',
              `/search/${query}/${p.id}`
            );
            router.push(`/search/${query}/${p.id}`);
          },
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
    console.log('🧲 Setting up IntersectionObserver');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('👀 loaderRef is visible → fetching more');
          fetchMoreProducts();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    } else {
      console.log('❗ loaderRef.current is NULL — not observing');
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchMoreProducts]);

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
        <h1 className="text-[35px] font-normal mb-6 ml-4 sm:ml-[340px] mt-[10px]">
          {query}
        </h1>

        {/* Always render grid and loader */}
        <div className="flex flex-col items-center gap-4 mt-6 mb-6">
          <ProductGrid products={products} />

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
