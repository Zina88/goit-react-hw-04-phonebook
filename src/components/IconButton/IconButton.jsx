import React from 'react';
import PropTypes from 'prop-types';
import css from './IconButton.module.css';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className={css.iconBtn} onClick={onClick} {...allyProps}>
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

export default IconButton;

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string,
};
