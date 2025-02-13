"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { useRouter } from "next/navigation";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // ✅ Fetch favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const handleProductClick = (product: { id: number; name: string }) => {
    // ✅ Navigate to product detail page
    router.push(`/search/${encodeURIComponent(product.name)}/${product.id}`);
  };

  const handleFavoriteToggle = (productId: number) => {
    // ✅ Remove product from favorites
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Избранное</h1>
      {favorites.length > 0 ? (
        <ProductGrid
          products={favorites.map((product) => ({
            ...product,
            onClick: () => handleProductClick(product),
          }))}
        />
      ) : (
        <p className="text-gray-400">Нет избранных товаров.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
