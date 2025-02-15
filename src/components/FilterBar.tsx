import { useState } from "react";

const FilterBar = ({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const formatSize = (size: string) => {
    return size.replace(/[^\d]/g, ""); 
  };

  const applyFilters = () => {
    const filters: Record<string, string> = {};
  
    if (selectedSize) filters.size = formatSize(selectedSize);
    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedCategory) filters.category = selectedCategory;
    if (selectedColor) filters.color = selectedColor;
    if (minPrice !== null) filters.price_min = String(minPrice);
    if (maxPrice !== null) filters.price_max = String(maxPrice);
  
    console.log("Applying Filters:", filters);
    onApplyFilters(filters);

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 mt-[30px] relative ml-[270px]">
      <button
        onClick={toggleModal}
        className="border-1 border-borderColor bg-black text-borderColor px-7 py-0.25 rounded-full hover:bg-purple-600 hover:text-white"
      >
        Фильтр
      </button>
      <div className = "border-1 border-borderColor bg-black text-borderColor px-7 rounded-full hover:bg-purple-600 hover:text-white">
        Категория
      </div>
      <div className = "border-1 border-borderColor bg-black text-borderColor px-7 rounded-full hover:bg-purple-600 hover:text-white">
        Бренд
      </div>
      <div className = "border-1 border-borderColor bg-black text-borderColor px-7 rounded-full hover:bg-purple-600 hover:text-white">
        Размер
      </div>
      <div className = "border-1 border-borderColor bg-black text-borderColor px-7 rounded-full hover:bg-purple-600 hover:text-white">
        Цена
      </div>
      <div className = "border-1 border-borderColor bg-black text-borderColor px-7 rounded-full hover:bg-purple-600 hover:text-white">
        Пол
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={toggleModal} 
        >
          <div
            className="relative bg-darkgrayColor text-borderColor rounded-lg p-6 w-[1040px] h-[750px] flex flex-col"
            style={{ border: "1px solid #6B7280" }}
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-borderColor hover:text-white"
            >
              ✕
            </button>

            <div className="text-center mb-6 text-2xl font-bold text-white">
              Фильтр
            </div>

            <div className="grid gap-6 overflow-y-auto">
              <div>
                <div className="text-borderColor mb-2">Категория</div>
                <div className="flex flex-wrap gap-2">
                  {[
  "Кроссовки", 
  "Верхняя Одежда", 
  "Брюки", 
  "Рубашки", 
  "Майки", 
  "Пиджаки и костюмы", 
  "Джинсы", 
  "Худи и свитшоты", 
  "Футболки", 
  "Спортивные костюмы", 
  "Нижнее белье", 
  "Носки", 
  "Свитеры и кардиганы"
]
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(prev => prev === category ? null : category)}
                      className={`px-4 py-0.5 rounded-full ${
                        selectedCategory === category ? "bg-purple-600 text-white" : "bg-darkgrayColor border-2 border-borderColor text-borderColor"
                      } hover:bg-purple-600 hover:text-white`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-borderColor mb-2">Бренд</div>
                <div className="flex flex-wrap gap-2">
                  {["AdidasOriginals", "Nike", "Puma", "Karl Lagerfeld", "Reebok","New Balance", "Asics", "Converse", "Onitsuka Tiger", "Lacoste", "Vans", "Calvin Klein"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(prev => prev === brand ? null : brand)}
                      className={`px-4 py-0.5 rounded-full ${
                        selectedBrand === brand ? "bg-purple-600 text-white" : "bg-darkgrayColor border-2 border-borderColor text-borderColor"
                      } hover:bg-purple-600 hover:text-white`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-borderColor mb-2">Размер</div>
                <div className="flex flex-wrap gap-2">
                  {["36", "37", "38", "39", "40", "41", "42", "43", "3", "3.5", "4", "7", "8", "9"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(prev => prev === size ? null : size)}
                      className={`px-4 py-0.5 rounded-full ${
                        selectedSize === size ? "bg-purple-600 text-white" : "bg-darkgrayColor border-2 border-borderColor text-borderColor"
                      } hover:bg-purple-600 hover:text-white`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-borderColor mb-2">Цена</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="Мин."
                    className="w-24 p-0.5 bg-darkgrayColor border-2 border-borderColor rounded-full text-borderColor text-sm px-2"
                  />
                  <span className="text-borderColor">—</span>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="Макс."
                    className="w-24 p-0.5 bg-darkgrayColor border-2 border-borderColor rounded-full text-borderColor text-sm px-2"
                  />
                </div>
              </div>

              <div>
                <div className="text-borderColor mb-2">Цвет</div>
                <div className="flex flex-wrap gap-2">
                  {["Золотой", "Черный", "Белый", "Синий", "Серый", "Зеленый", "Желтый", "Оранжевый", "Красный", "Розовый", "Фиолетовый", "Хаки"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(prev => prev === color ? null : color)}
                      className={`px-4 py-2 rounded-full ${
                        selectedColor === color ? "bg-purple-600 text-white" : "bg-darkgrayColor border-2 border-borderColor text-borderColor"
                      } hover:bg-purple-600 hover:text-white`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-800"
            >
              Показать результаты
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
