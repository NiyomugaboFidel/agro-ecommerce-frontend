import { useEffect, useState } from "react";
import { Grid, Typography, Menu, MenuItem, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import FlashSaleItem from "../components/common/components/FlashSaleItem";
import i18n from "../components/common/components/LangConfig";
import ViewAll from "../components/common/components/ViewAll";
import WhiteButton from "../components/common/components/WhiteButton";
import { fetchProductByCat } from "../services/products/products";

const Category = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const { catName } = useParams();

  useEffect(() => {
    const fetchProdsByCategory = async (catName) => {
      try {
        const data = await fetchProductByCat(catName); // Call the correct function
        console.log("data===", data);
        setFilteredItems(data); // Set the state with the fetched data
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProdsByCategory(catName); // Call with the correct function
  }, [catName]);

  console.log("filteredItems", filteredItems);

  return (
    <div className="container mx-auto mt-40 flex flex-col gap-5">
      <Typography variant="h3" align="center" gutterBottom>
        {i18n.t("allProducts.byCategory")}
      </Typography>
      <div className="relative mx-2 my-10 flex flex-row gap-2 md:gap-12 transition-transform duration-300 transform ">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {filteredItems.map((item, index) => (
            <Grid item key={item._id}>
              <FlashSaleItem
                key={item._id}
                item={{
                  id: item._id,
                  imageSrc: item.images[0],
                  title: item.title,
                  price: item.price,
                  stars: item.stars || 0,
                  rates: item.rates || 0,
                  discount: item.discount || "",
                  moq: item.moq,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="mt-6 flex justify-center gap-5 md:gap-20 items-center md:mx-12 ">
        <Link to="..">
          <WhiteButton name={i18n.t("whiteButtons.backToHomePage")} />
        </Link>
        <ViewAll name={i18n.t("redButtons.viewAllProducts")} />
      </div>
    </div>
  );
};

export default Category;
