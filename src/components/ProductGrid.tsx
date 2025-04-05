import ProductCard from './ProductCard';

const ProductGrid = ({
  products,
}: {
  products: {
    id: number;
    name: string;
    sale_price: number;
    first_price?: number;
    brand: string;
    shop: string;
    image_url: string;
    link: string;
    category: string[];
    onClick?: () => void;
  }[];
}) => {
  return (
    <div
      className="bg-[#171717] p-[10px] rounded-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-[900px] mx-auto mb-5 px-4"
      style={{ minHeight: '100px' }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={product.onClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
