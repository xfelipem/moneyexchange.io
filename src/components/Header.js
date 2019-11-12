import PropTypes from 'prop-types';
import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import appConfig from '../configuration';

const { landing } = appConfig;

const LandingHeader = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content={landing.title}
      inverted
      style={{
        fontSize: mobile ? '2em' : '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        margin: mobile ? '1.5em' : '1em'
      }}
    />
  </Container>
);

LandingHeader.propTypes = {
  mobile: PropTypes.bool
};

export default LandingHeader;
