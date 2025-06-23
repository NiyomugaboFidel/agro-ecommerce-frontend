import { useState, useEffect } from "react";
import Row1 from "../components/Home/Row1";
import Deal from "../components/Home/Deal";
import BestSelling from "../components/Home/BestSelling";
import Services from "../components/common/components/Services";
import Featured from "../components/Home/Featured";
import ProductsByCategory from "../components/Home/FlashSale";
import i18n from "../components/common/components/LangConfig";
import ViewAll from "../components/common/components/ViewAll";
import { fetchProductByCat } from "../services/products/products";

const Home = () => {
  const [categoryVisibility, setCategoryVisibility] = useState({
    Agriculture: false,
    Handicrafts: false,
    Food: false,
    Textiles: false,
    Cosmetics: false,
    "Energy and Resources": false,
    Chemicals: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Category configuration
  const categories = [
    { key: "agriculture", translationKey: "homeSections.row1.col1.0" },
    { key: "food", translationKey: "homeSections.row1.col1.2" },
    // { key: "Handicrafts", translationKey: "homeSections.row1.col1.1" },

    // { key: "Textiles", translationKey: "homeSections.row1.col1.3" },
    // { key: "Cosmetics", translationKey: "homeSections.row1.col1.4" },
    // { key: "Energy and Resources", translationKey: "homeSections.row1.col1.5" },
    // { key: "Chemicals", translationKey: "homeSections.row1.col1.6" },
  ];

  useEffect(() => {
    const checkCategoryProducts = async () => {
      setIsLoading(true);
      const visibility = {};

      // Check each category for products
      for (const category of categories) {
        try {
          const data = await fetchProductByCat(category.key);
          // Set visibility to true if products exist and array is not empty
          visibility[category.key] = data && Array.isArray(data) && data.length > 0;
        } catch (error) {
          console.error(`Error fetching products for ${category.key}:`, error);
          visibility[category.key] = false;
        }
      }

      setCategoryVisibility(visibility);
      setIsLoading(false);
    };

    checkCategoryProducts();
  }, []);

  if (isLoading) {
    return (
      <main
        dir="ltr"
        className="flex flex-col xl:mx-20 mt-[100px] gap-3 items-center justify-center min-h-[400px]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="ltr"
      className="flex flex-col xl:mx-20 mt-[100px] gap-3 items-center justify-center"
    >
      <Row1 />
      
      {/* Render ProductsByCategory components conditionally */}
      {categories.map((category) => 
        categoryVisibility[category.key] && (
          <ProductsByCategory
            key={category.key}
            id={category.key === "agriculture" ? "/" : category.key.toLowerCase()}
            title={i18n.t(category.translationKey)}
            productCat={category.key}
          />
        )
      )}

      {/* Show ViewAll button only if at least one category has products */}
      {Object.values(categoryVisibility).some(visible => visible) && (
        <div className="flex justify-center mt-4">
          <ViewAll name={i18n.t("redButtons.viewAllProducts")} />
        </div>
      )}

      {/* Show message if no categories have products */}
      {!Object.values(categoryVisibility).some(visible => visible) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-500 text-lg mb-4">
            No products available in any category at the moment.
          </div>
          <div className="text-gray-400 text-sm">
            Please check back later for new products.
          </div>
        </div>
      )}

      <BestSelling />
      <Deal />
      <Featured />
      <Services />
    </main>
  );
};

export default Home;