/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const RedTitle = ({ title, color = "red-500" }) => {
  return (
    <div className="mb-8 flex flex-row gap-4 items-center md:text-lg  font-semibold">
      <span className="dark:bg-third bg-secondary h-10 w-5 rounded"></span>
      <span className={"dark:text-third text-secondary"}>{title}</span>
    </div>
  );
};

RedTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default RedTitle;
