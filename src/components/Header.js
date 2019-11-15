/**
 * Header
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Header as SemanticHeader, Container } from 'semantic-ui-react';
import appConfig from '../configuration';

const { title } = appConfig.landing;
const getStyles = mobile => ({
  fontSize: mobile ? '2em' : '3em',
  fontWeight: 'normal',
  marginBottom: 0,
  margin: mobile ? '1.5em' : '1em'
});

/**
 * A multi device header component.
 *
 * @returns {Component}
 */
const Header = ({ mobile }) => (
  <Container text>
    <SemanticHeader
      as="h1"
      content={title}
      inverted
      style={getStyles(mobile)}
    />
  </Container>
);

Header.propTypes = {
  mobile: PropTypes.bool
};

export default Header;
