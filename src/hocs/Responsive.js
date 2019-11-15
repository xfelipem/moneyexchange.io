/**
 * Responsive
 * High Order Component which handles the different view types.
 */
import PropTypes from 'prop-types';
import React from 'react';
import DesktopHoc from './Desktop';
import MobileHoc from './Mobile';

/**
 * High Order Component which handles the views based on screen orientation. Currently handles
 * Mobile and Desktop view types.
 *
 * @returns {Component}
 */
const ResponsiveHoc = ({ children }) => (
  <div>
    <DesktopHoc>{children}</DesktopHoc>
    <MobileHoc>{children}</MobileHoc>
  </div>
);

ResponsiveHoc.propTypes = {
  children: PropTypes.node
};

export default ResponsiveHoc;
