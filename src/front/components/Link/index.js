import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ href, children }) => (
  <a className="waves-effect waves-light btn btn-large" href={href}>{children}</a>
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Link;
