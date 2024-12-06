import React from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';

const animatedComponents = makeAnimated();

const filterOptions = (inputValue, options) => {
  return options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue, options) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterOptions(inputValue, options));
    }, 1000);
  });

const customStyles = {
  control: (styles) => ({
    ...styles,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#3E3478',
    borderRadius: '12px',
    padding: '8px 5px',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? '#3E3478'
      : isFocused
      ? '#eef7ff'
      : undefined,
    color: isDisabled ? '#ccc' : isSelected ? 'white' : '#3E3478',
    cursor: isDisabled ? 'not-allowed' : 'default',
    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#3E3478'
          : '#eef7ff'
        : undefined,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#eef7ff',
    borderRadius: '8px',
    margin: '5px',
    display: 'flex',
    justifyContent: 'center',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#3E3478',
    paddingRight: '6px',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#3E3478',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#3E3478',
      color: 'white',
    },
  }),
};

const MultiSelect = ({
  options = [],
  selectedOptions = [],
  onChange,
  name,
  isLoading = false,
}) => {
  const loadOptions = (inputValue) => promiseOptions(inputValue, options);

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      components={animatedComponents}
      loadOptions={loadOptions}
      value={selectedOptions}
      isLoading={isLoading}
      onChange={(selected) => onChange(name, selected || [])}
      name={name}
      styles={customStyles}
    />
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default MultiSelect;
