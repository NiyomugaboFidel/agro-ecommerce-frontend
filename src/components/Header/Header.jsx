import { useState, useRef, useEffect } from "react";
import Search from "../common/components/ui/SearchHome";
import Drawer from "@mui/material/Drawer";
import Logo from "./Logo";
import Navigations from "./Navigations";
import Profile from "./Profile";
import { FaMagnifyingGlass } from "react-icons/fa6"; // Search icon
import { IconButton } from "@mui/material"; // Material-UI for Hamburger Icon
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger Icon
import { useTheme } from "@mui/material/styles"; // Import useTheme
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Detect tablet or smaller screens

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Toggle drawer for small devices
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Close search bar when clicked outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <header className="fixed top-12 md:top-12 left-0 w-full z-20 bg-white dark:bg-darkTheme shadow-md dark:shadow-sm dark:shadow-white/20">
      <div className="flex justify-between xl:justify-around items-center sm:px-8 px-2 py-1 md:py-2">
        <Logo />

        <div className="flex items-center">
          {!isMobile && (
            <div className="hidden md:flex">
              <Navigations />
            </div>
          )}
          <div className="flex justify-center items-center md:gap-2">
            <div className="hidden md:flex">
              <Search />
            </div>
            {!isSearchVisible && (
              <div className="md:hidden">
                <button onClick={toggleSearchBar}>
                  <FaMagnifyingGlass className="w-6 h-6 text-gray-500 dark:text-gray-300 mt-2" />
                </button>
              </div>
            )}
            <Profile />
            {isMobile && (
              <div className="lg:hidden">
                <IconButton
                  edge="end"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon fontSize="large" className="dark:text-gray-300"  />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Navigations toggleDrawer={toggleDrawer} />
      </Drawer>
      {isSearchVisible && (
        <div
          ref={searchRef}
          className="absolute top-16 left-0 w-full shadow-md transition-transform duration-500 ease-in-out transform"
        >
          <Search
            onSearchSubmit={() => {
              setIsSearchVisible(false);
            }}
          />
        </div>
      )}

      <hr className="w-full border-gray-300 md:hidden" />
    </header>
  );
};


export default Header;
