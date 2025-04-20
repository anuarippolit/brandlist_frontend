'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumb from '@/components/Breadcrumb';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import { useRouter } from 'next/navigation';

const SearchResults = ({ params }: { params: Promise<{ query: string }> }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 20;

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    const init = async () => {
      const resolvedParams = await params;
      const searchQuery = decodeURIComponent(resolvedParams.query || '');
      setQuery(searchQuery);
      fetchFilteredProducts({ name: searchQuery }, 1);
    };
    init();
  }, [params]);

  const fetchFilteredProducts = async (
    filters: Record<string, string>,
    page: number = 1
  ) => {
    setIsLoading(true);
    try {
      const skip = (page - 1) * limit;
      const queryParams = new URLSearchParams({
        ...filters,
        skip: skip.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/filter?${queryParams}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Filtered Products:', data);

      setProducts(
        (data.results || []).map((product: any) => ({
          ...product,
          onClick: () => router.push(`/search/${query}/${product.id}`),
        }))
      );

      setCurrentPage(page);
      setTotalCount(data.total || data.count || 100);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setIsLoading(false);
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
        <h1 className="text-[35px] font-normal mb-6 ml-4 sm:ml-[340px] mt-[10px]">
          {query}
        </h1>

        <FilterBar
          query={query}
          onApplyFilters={(filters, page = 1) =>
            fetchFilteredProducts(filters, page)
          }
        />

        {isLoading ? (
          <p className="text-gray-400 text-center mt-6">Загружается...</p>
        ) : products.length > 0 ? (
          <>
            <ProductGrid products={products} />

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  className="px-4 py-2 border rounded text-white border-borderColor"
                  disabled={currentPage === 1}
                  onClick={() =>
                    fetchFilteredProducts({ name: query || '' }, currentPage - 1)
                  }
                >
                  ← Назад
                </button>
                <span className="text-white">
                  Страница {currentPage} из {totalPages}
                </span>
                <button
                  className="px-4 py-2 border rounded text-white border-borderColor"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    fetchFilteredProducts({ name: query || '' }, currentPage + 1)
                  }
                >
                  Вперёд →
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center mt-6">Ничего не найдено.</p>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
