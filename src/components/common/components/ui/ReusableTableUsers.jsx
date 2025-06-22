import React from 'react';
import PropTypes from 'prop-types';
import { FaUserEdit, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import i18n from '../LangConfig';

const ReusableTable = ({
  data,
  columns,
  formatDate,
  handleEditClick,
  userRole,
  pagination: {
    activePage,
    totalPages,
    previousPage,
    nextPage,
    goToPage,
  },
}) => {

  return (
    <div>
      <table className='w-full border rounded-lg dark:border-gray-700'>
        <thead className='py-6'>
          <tr className='py-6 dark:border-gray-700 border bg-[#F8F8F8] dark:bg-white/10 pl-3 rounded-t-lg'>
            {columns.map((column, index) => (
              <th key={index} className='text-start pl-3 py-2 text-gray-600 dark:text-gray-200 text-xs'>{column.header}</th>
            ))}
            {userRole !== 'manager' && (
              <th className='text-start py-2 dark:text-gray-400'>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='border-b dark:hover:bg-white/10 dark:border-gray-700 border-green-200 text-gray-700 dark:text-gray-300 h-full text-xs'>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className='text-start pl-3 py-2  text-xs text-gray-600 dark:text-gray-300'>
                  {column.render ? column.render(item[column.accessor], item) : item[column.accessor]}
                </td>
              ))}
              {userRole !== 'agent' && (
                <td className='flex gap-2 py-2 items-start'>
                  <FaUserEdit size={20} onClick={() => handleEditClick(item)} className='cursor-pointer text-slate-500 dark:text-gray-300' />{' '}
                  <Link to={`/dashboard/profiles/${item._id}`}><FaRegEye size={20} className='dark:text-gray-300 text-slate-500'/></Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center xs:self-center w-full py-4 gap-2'>
        <button
          onClick={previousPage}
          disabled={activePage <= 1}
          className={`${
            activePage <= 1 ? 'text-[#857b7b]' : 'text-primary-2'
          } px-2 border border-slate-500 text-xs text-gray-600 dark:text-gray-300 rounded-xl`}
        >
          {i18n.t("dashboard.previous")}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`${
              activePage === index + 1
                ? 'text-white bg-primary '
                : 'text-black'
            } border-[1px] px-2 py-2 text-xs dark:text-gray-300 rounded-full xs:hidden`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={activePage >= totalPages}
          className={`${
            activePage >= totalPages ? 'text-[#857b7b]' : 'text-primary-2'
          } px-2 border border-slate-500 text-xs text-gray-600 dark:text-gray-300 rounded-xl`}
        >
          {i18n.t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
  // handleEditClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired, // Add this prop type
  pagination: PropTypes.shape({
    activePage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    previousPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReusableTable;
