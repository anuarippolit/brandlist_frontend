// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Breadcrumb from '@/components/Breadcrumb';
// import Navbar from '@/components/Navbar';

// interface Product {
//   id: number;
//   category: string[];
//   name: string;
//   brand: string;
//   description?: string;
//   sale_price: number;
//   first_price?: number;
//   image_url: string;
//   sizes: string[];
//   shop: string;
//   link: string;
// }

// const ProductDetail = ({
//   params,
// }: {
//   params: Promise<{ query: string; productId: string }>;
// }) => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [query, setQuery] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isFavorited, setIsFavorited] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const resolvedParams = await params;
//         const { query, productId } = resolvedParams;
//         setQuery(query);

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Fetched Product:', data);

//         setProduct(data);

//         // Проверка, есть ли продукт в избранном
//         const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//         setIsFavorited(
//           favorites.some((fav: { id: number }) => fav.id === data.id)
//         );
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params]);

//   const handleFavoriteToggle = () => {
//     if (!product) return;

//     let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

//     if (isFavorited) {
//       favorites = favorites.filter(
//         (fav: { id: number }) => fav.id !== product.id
//       );
//     } else {
//       favorites.push(product);
//     }

//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     setIsFavorited(!isFavorited);
//   };

//   if (loading) {
//     return <div className="text-white text-center mt-6">Loading...</div>;
//   }

//   if (!product) {
//     return (
//       <div className="text-gray-400 text-center mt-6">Продукт не найден.</div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Breadcrumb
//         breadcrumbs={[
//           { label: 'Поиск', href: '/home' },
//           { label: query || '...', href: `/search/${query}` },
//           { label: product.name },
//         ]}
//       />

//       <div className="flex flex-col lg:flex-row gap-6 mt-4 px-4 lg:px-0">
//         <div className="w-auto h-auto sm:h-[620px] sm:w-[480px] bg-gray-300 rounded-lg sm:ml-[200px] relative">
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="object-cover w-full h-full rounded-lg"
//           />

//           {/* Кнопка избранного */}
//           <button
//             className="absolute top-4 right-4 text-white"
//             onClick={handleFavoriteToggle}
//           >
//             <img
//               src={
//                 isFavorited
//                   ? '/images/filledheart.png'
//                   : '/images/blackheart.png'
//               }
//               alt="Favorite"
//               className="w-[20px] h-[18px]"
//             />
//           </button>
//         </div>

//         <div className="w-full sm:w-[550px] bg-[#171717] h-[350px] p-6 rounded-lg font-inter">
//           <h2 className="text-[16px] font-normal">{product.brand}</h2>
//           <h3 className="text-[16px] font-bold mt-[15px] mb-[15px]">
//             {product.name}
//           </h3>

//           <div className="bg-[#333333] p-4 rounded-lg mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
//             <div className="flex flex-wrap gap-1.5 mt-[15px]">
//               {product?.sizes?.slice(0, 3).map((size, index) => (
//                 <span
//                   key={index}
//                   className="border-1 border-[#919191] text-[#919191] px-3 py-1 rounded-xl"
//                 >
//                   {size}
//                 </span>
//               ))}
//             </div>

//             <div className="flex flex-col items-start sm:items-end">
//               <a
//                 href={product.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-customPurple px-8 py-0.5 rounded-3xl text-white hover:bg-purple-500 text-[16px] text-center"
//               >
//                 В магазин
//               </a>

//               <div className="flex gap-3 mt-2 sm:ml-0 ml-2">
//                 {product.first_price &&
//                   product.first_price !== product.sale_price && (
//                     <p className="text-[#919191] line-through text-[16px]">
//                       {product.first_price.toLocaleString()} ₸
//                     </p>
//                   )}
//                 <p className="text-white text-[16px]">
//                   {product?.sale_price?.toLocaleString()} ₸
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Breadcrumb from '@/components/Breadcrumb';
// import Navbar from '@/components/Navbar';

// interface Product {
//   id: number;
//   category: string[];
//   name: string;
//   brand: string;
//   description?: string;
//   sale_price: number;
//   first_price?: number;
//   image_url: string;
//   sizes: string[];
//   shop: string;
//   link: string;
// }

// import { Metadata } from 'next';

// interface Props {
//   params: {
//     query: string;
//     productId: string;
//   };
// }

// export default function ProductDetail({ params }: Props) {
//   const { query, productId } = params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isFavorited, setIsFavorited] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       console.log('📦 Product page params:', { query, productId });
//       console.log('🔍 Fetching product by ID:', productId);

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
//         );

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(
//             `❌ Product fetch failed: ${response.status}`,
//             errorText
//           );
//           throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('✅ Loaded product:', data);
//         setProduct(data);
//       } catch (error) {
//         console.error('❌ Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId, query]);

//   const handleFavoriteToggle = () => {
//     if (!product) return;

//     let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

//     if (isFavorited) {
//       favorites = favorites.filter(
//         (fav: { id: number }) => fav.id !== product.id
//       );
//     } else {
//       favorites.push(product);
//     }

//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     setIsFavorited(!isFavorited);
//   };

//   if (loading) {
//     return <div className="text-white text-center mt-6">Loading...</div>;
//   }

//   if (!product) {
//     return (
//       <div className="text-gray-400 text-center mt-6">Продукт не найден.</div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Breadcrumb
//         breadcrumbs={[
//           { label: 'Поиск', href: '/home' },
//           { label: query || '...', href: `/search/${query}` },
//           { label: product.name },
//         ]}
//       />

//       <div className="flex flex-col lg:flex-row justify-center gap-6 mt-4 px-4">
//         <div className="w-auto h-auto sm:h-[620px] sm:w-[480px] bg-gray-300 rounded-lg relative">
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="object-cover w-full h-full rounded-lg"
//           />

//           <button
//             className="absolute top-4 right-4 text-white"
//             onClick={handleFavoriteToggle}
//           >
//             <img
//               src={
//                 isFavorited
//                   ? '/images/filledheart.png'
//                   : '/images/blackheart.png'
//               }
//               alt="Favorite"
//               className="w-[20px] h-[18px]"
//             />
//           </button>
//         </div>

//         <div className="w-full sm:w-[550px] bg-[#171717] h-[350px] p-6 rounded-lg font-inter">
//           <h2 className="text-[16px] font-normal">{product.brand}</h2>
//           <h3 className="text-[16px] font-bold mt-[15px] mb-[15px]">
//             {product.name}
//           </h3>

//           <div className="bg-[#333333] p-4 rounded-lg mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
//             <div className="grid grid-cols-5 gap-2 mt-[12px]">
//               {product?.sizes?.map((size, index) => (
//                 <span
//                   key={index}
//                   className="text-[#919191] border border-[#919191] px-3 py-1 rounded-xl text-center text-sm"
//                 >
//                   {size}
//                 </span>
//               ))}
//             </div>

//             <div className="flex flex-col items-start sm:items-end">
//               <a
//                 href={product.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-customPurple px-8 py-0.5 rounded-3xl text-white hover:bg-purple-500 text-[16px] text-center mt-[12px]"
//               >
//                 В магазин
//               </a>

//               <div className="flex gap-3 mt-2 sm:ml-0 ml-2 mt-[15px]">
//                 {product.first_price &&
//                   product.first_price !== product.sale_price && (
//                     <p className="text-[#919191] line-through text-[16px]">
//                       {product.first_price.toLocaleString()} ₸
//                     </p>
//                   )}
//                 <p className="text-white text-[16px]">
//                   {product?.sale_price?.toLocaleString()} ₸
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar';

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

interface Props {
  params: Promise<{
    query: string;
    productId: string;
  }>;
}

export default function ProductDetail({ params }: Props) {
  const { query, productId } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('📦 Product page params:', { query, productId });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `❌ Product fetch failed: ${response.status}`,
            errorText
          );
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Loaded product:', data);
        setProduct(data);
      } catch (error) {
        console.error('❌ Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, query]);

  const handleFavoriteToggle = () => {
    if (!product) return;

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

  if (loading) {
    return <div className="text-white text-center mt-6">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-gray-400 text-center mt-6">Продукт не найден.</div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Breadcrumb
        breadcrumbs={[
          { label: 'Поиск', href: '/home' },
          { label: query || '...', href: `/search/${query}` },
          { label: product.name },
        ]}
      />

      <div className="flex flex-col lg:flex-row justify-center gap-6 mt-4 px-4">
        <div className="w-auto h-auto sm:h-[620px] sm:w-[480px] bg-gray-300 rounded-lg relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full rounded-lg"
          />

          <button
            className="absolute top-4 right-4 text-white"
            onClick={handleFavoriteToggle}
          >
            <img
              src={
                isFavorited
                  ? '/images/filledheart.png'
                  : '/images/blackheart.png'
              }
              alt="Favorite"
              className="w-[20px] h-[18px]"
            />
          </button>
        </div>

        <div className="w-full sm:w-[550px] bg-[#171717] h-[350px] p-6 rounded-lg font-inter">
          <h2 className="text-[16px] font-normal">{product.brand}</h2>
          <h3 className="text-[16px] font-bold mt-[15px] mb-[15px]">
            {product.name}
          </h3>

          <div className="bg-[#333333] p-4 rounded-lg mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="grid grid-cols-5 gap-2 mt-[12px]">
              {product?.sizes?.map((size, index) => (
                <span
                  key={index}
                  className="text-[#919191] border border-[#919191] px-3 py-1 rounded-xl text-center text-sm"
                >
                  {size}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-customPurple px-8 py-0.5 rounded-3xl text-white hover:bg-purple-500 text-[16px] text-center mt-[12px]"
              >
                В магазин
              </a>

              <div className="flex gap-3 mt-2 sm:ml-0 ml-2 mt-[15px]">
                {product.first_price &&
                  product.first_price !== product.sale_price && (
                    <p className="text-[#919191] line-through text-[16px]">
                      {product.first_price.toLocaleString()} ₸
                    </p>
                  )}
                <p className="text-white text-[16px]">
                  {product?.sale_price?.toLocaleString()} ₸
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
