import { useState, useEffect } from 'react';

const ProductCard = ({
  product,
  onClick,
}: {
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
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(
      favorites.some((fav: { id: number }) => fav.id === product.id)
    );
  }, [product.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorited) {
      favorites = favorites.filter(
        (fav: { id: number }) => fav.id !== product.id
      );
    } else {
      favorites.push(product);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className="bg-neutral-900 p-[5px] sm:p-[10px] rounded-lg shadow-md hover:shadow-lg cursor-pointer font-inter font-normal flex flex-col h-full" // instead of w-full flex flex-col h-full
      onClick={onClick}
    >
      <div className="bg-gray-200 aspect-[3/4] w-full rounded-lg mb-4 relative overflow-hidden ">
        {' '}
        {/*// div className="bg-gray-200 aspect-[3/4] w-full rounded-lg mb-4 relative overflow-hidden // bg-gray-200 h-[175px] w-[133px] sm:h-[250px] sm:w-[180px] rounded-lg mb-4 relative */}
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
            src={
              isFavorited ? '/images/filledheart.png' : '/images/blackheart.png'
            }
            alt="Favorite"
            className="w-[20px] h-[18px]"
          />
        </button>
      </div>

      <div>
        <p className="text-[14px] sm:text-[16px] font-normal text-white">
          {product.sale_price
            ? product.sale_price.toLocaleString()
            : 'Цена не указана'}{' '}
          ₸{' '}
          {product.first_price &&
            product.first_price !== product.sale_price && (
              <span className="text-[#919191] line-through text-[16px]">
                {product.first_price.toLocaleString()} ₸
              </span>
            )}
        </p>
        <p className="text-[14px] sm:text-[16px] font-medium mt-2">
          {product.name}
        </p>
        <p className="font-normal text-[12px] sm:text-[14px] mt-2">
          {product.brand} ({product.shop})
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
