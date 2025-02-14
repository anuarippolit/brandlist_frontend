import { useState, useEffect } from "react";

const ProductCard = ({ product, onClick }: { 
  product: {
    id: number;
    name: string;
    sale_price: number;
    first_price?: number;
    brand: string;
    shop: string;
    image_url: string;
    link: string;
    category: string[];
  }; 
  onClick?: () => void;
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // ✅ Check if product is already in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.some((fav: { id: number }) => fav.id === product.id));
  }, [product.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorited) {
      // ✅ Remove from favorites
      favorites = favorites.filter((fav: { id: number }) => fav.id !== product.id);
    } else {
      // ✅ Add to favorites
      favorites.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div 
      className="bg-neutral-900 p-[10px] rounded-lg shadow-md hover:shadow-lg cursor-pointer font-inter font-normal"
      onClick={onClick}
    >
      <div className="bg-gray-200 h-[300px] w-[225px] rounded-lg mb-4 relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover rounded-lg"
        />
        <button
          className="absolute top-2 right-2 text-white"
          onClick={handleFavoriteToggle}
        >
          <img
            src={isFavorited ? "/images/filledheart.png" : "/images/blackheart.png"}
            alt="Favorite"
            className="w-5 h-5"
          />
        </button>
      </div>

      <div>
        <p className="text-[16px] font-normal text-white">
        {product.sale_price ? product.sale_price.toLocaleString() : "Цена не указана"} ₸{" "}
        {product.first_price ? (
  <span className="text-gray-400 text-[16px] line-through">
    {product.first_price.toLocaleString()} ₸
  </span>
) : null}

        </p>
        <p className="text-[16px] font-medium mt-2">{product.name}</p>
        <p className="font-normal text-[14px] mt-2">{product.brand} ({product.shop})</p>
      </div>
    </div>
  );
};

export default ProductCard;
