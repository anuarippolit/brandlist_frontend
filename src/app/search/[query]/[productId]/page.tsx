"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Navbar";

interface Product {
  id: number;
  category: string[];
  name: string;
  brand: string;
  description?: string;
  sale_price: number;
  first_price?: number;
  image_url: string;
  sizes: string[];
  shop: string;
  link: string;
}

const ProductDetail = ({ params }: { params: Promise<{ query: string; productId: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params;
        const { query, productId } = resolvedParams;
        setQuery(query);

        const response = await fetch(`http://localhost:8000/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Product:", data); // Debugging

        setProduct(data); // Assuming API returns single product
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <div className="text-white text-center mt-6">Loading...</div>;
  }

  if (!product) {
    return <div className="text-gray-400 text-center mt-6">Продукт не найден.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Navbar />
      <Breadcrumb breadcrumbs={[{ label: "Поиск", href: "/home" }, { label: query || "...", href: `/search/${query}` }, { label: product.name }]} />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Product Image */}
        <div className="h-[620px] w-[480px] bg-gray-300 rounded-lg ml-[350px] relative">
          <img src={product.image_url} alt={product.name} className="object-cover w-full h-full rounded-lg" />
        </div>

        {/* Product Info */}
        <div className="w-[550px] bg-neutral-900 p-6 rounded-lg">
          <h2 className="text-[16px] font-normal">{product.brand} ({product.shop})</h2>
          <h3 className="text-[16px] mt-2 font-bold">{product.name}</h3>
          
          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-[16px] font-normal">Размеры:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size, index) => (
                  <span key={index} className="border-2 border-gray-500 text-gray-500 px-3 py-1 rounded-xl">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          <p className="text-white mt-4">
            Цена: <span className="font-bold">{product.sale_price.toLocaleString()} ₸</span>
          </p>
          {product.first_price && (
            <p className="text-gray-400 line-through">Старая цена: {product.first_price.toLocaleString()} ₸</p>
          )}

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h3 className="text-[16px] font-normal">Описание</h3>
              <p className="text-gray-400 mt-2">{product.description}</p>
            </div>
          )}

          {/* Store Link */}
          <div className="mt-6">
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 px-4 py-2 rounded-3xl text-white hover:bg-purple-500 text-[16px]">
              Перейти в магазин
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
