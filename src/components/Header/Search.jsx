import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { ITEMS } from "../common/functions/items";
import { CiSearch } from "react-icons/ci";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import i18n from "../common/components/LangConfig";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.grey[300], 0.3),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[300], 0.5),
  },
  flex: 1,
  maxWidth: "450px",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  padding: "4px 8px",
  boxShadow: `0 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
  transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "& .MuiAutocomplete-root": {
    flex: 1,
    "& .MuiInputBase-root": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "transparent",
      "& .MuiInputBase-input": {
        padding: "8px 12px",
        fontSize: "0.9rem", 
        [theme.breakpoints.down("sm")]: {
          fontSize: "0.8rem", 
        },
      },
    },
  },
  "& .MuiIconButton-root": {
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
}));

const SearchAppBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchText(searchText.trim());
    }
  };

  return (
    <Search className="flex items-center justify-center w-48 min-[425px]:w-64 sm:max-[1200px]:w-96 min-[1200px]:w-72 min-[1450px]:w-96 ">
      <Autocomplete
        freeSolo
        disableClearable
        disableListWrap
        openOnFocus
        options={ITEMS.map((item) => item.title)}
        value={searchText}
        onChange={(event, newValue) => setSearchText(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={i18n.t("search")}
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CiSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {searchText && (
        <IconButton aria-label="search" color="inherit">
          <Link to={`/allProducts/${searchText}`}>
            <CiSearch className="w-5 h-auto md:w-8 md:h-8 bg-red-400" />
          </Link>
        </IconButton>
      )}
    </Search>
  );
};

export default SearchAppBar;
