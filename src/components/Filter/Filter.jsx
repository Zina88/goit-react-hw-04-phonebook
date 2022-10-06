import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filterLabel}>
      <p className={css.filterTitle}>Find contacts by name</p>
      <input type="text" className={css.filterText} value={value} onChange={onChange} />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};
