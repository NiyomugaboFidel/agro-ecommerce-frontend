import { Link } from "@mui/material";

const Logo = () => {
  return (
    <div className=" items-center justify-center gap-4 min-[1300px]:flex">
      <Link href="/">
        <img src="/images/logo.jpg" alt="" className="w-[70px] md:w-[70px] object-contain object-center h-[70px] dark:hidden" />
        <img src="/images/logo.jpg" alt="" className="w-[70px] md:w-[70px] object-contain object-center ml-5 h-[70px] dark:block hidden" />
      </Link>
    </div>
  );
};
export default Logo;
