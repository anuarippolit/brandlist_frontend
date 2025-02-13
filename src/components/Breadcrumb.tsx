"use client";

import { useRouter, usePathname } from "next/navigation";

const Breadcrumb = ({
  breadcrumbs,
}: {
  breadcrumbs: { label: string; href?: string }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Check if the user is inside the "favorites" section
  const isFavoritesPage = pathname.startsWith("/favorites");

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <nav className="px-8 py-4 text-gray-400 font-inter text-[16px] font-normal ml-96">
      {isFavoritesPage ? (
        // ✅ Special breadcrumb for "Favorites" section
        <>
          <span
            className="cursor-pointer hover:text-white"
            onClick={() => handleClick("/favorites")}
          >
            Избранное
          </span>
          <span className="mx-2">&gt;</span>
          <span className="text-white">{breadcrumbs[breadcrumbs.length - 1].label}</span>
        </>
      ) : (
        // ✅ Default breadcrumb logic for search and other pages
        breadcrumbs.map((breadcrumb, index) => (
          <span key={index} className="inline-flex items-center">
            <span
              className={`cursor-pointer ${
                breadcrumb.href ? "hover:text-white" : "text-white"
              }`}
              onClick={() => handleClick(breadcrumb.href)}
            >
              {decodeURIComponent(breadcrumb.label)} {/* ✅ Decoding for readability */}
            </span>
            {index < breadcrumbs.length - 1 && <span className="mx-2">&gt;</span>}
          </span>
        ))
      )}
    </nav>
  );
};

export default Breadcrumb;
