// components/ui/ReusablePopup.js
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const ReusablePopup = ({
  isOpen,
  title,
  role,
  status,
  setRole,
  setStatus,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <form className='flex flex-col gap-4'>
          <div>
            <label
              htmlFor='role'
              className='block text-sm font-medium text-gray-700'
            >
              Role
            </label>
            <Select
              id='role'
              value={{ label: role, value: role }}
              onChange={(option) => setRole(option.value)}
              options={[
                { value: 'client', label: 'client' },
                { value: 'agent', label: 'agent' },
              ]}
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700'
            >
              Status
            </label>
            <Select
              id='status'
              value={{ value: status, label: status }}
              onChange={(option) => setStatus(option.value)}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              className='mt-1'
            />
          </div>
          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='button'
              className='px-4 py-2 bg-primary text-white rounded hover:bg-[#12413d]'
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReusablePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReusablePopup;