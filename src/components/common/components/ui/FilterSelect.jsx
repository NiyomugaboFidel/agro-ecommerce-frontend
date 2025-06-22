import React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import List from '@mui/joy/List';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';
import { Box } from '@mui/material';

const FilterSelect = ({ label, options, selectedValues, handleChange, multiple = false }) => {
  return (
    <Dropdown>
      <MenuButton endDecorator={<ArrowDropDown />}>
        {label}: {multiple ? selectedValues.join(', ') : selectedValues}
      </MenuButton>
      <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            role={multiple ? 'menuitemcheckbox' : 'menuitemradio'}
            aria-checked={multiple ? selectedValues.includes(option.value) : option.value === selectedValues ? 'true' : 'false'}
            onClick={() => handleChange(option.value)}
          >
            <ListItemDecorator>
              {(multiple && selectedValues.includes(option.value)) && <ArrowRight />}
            </ListItemDecorator>{' '}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default FilterSelect;
