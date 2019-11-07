import PropTypes from 'prop-types'
import React from 'react';
import { Header, Container } from 'semantic-ui-react';
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const LandingHeader = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '3em',
        fontWeight: 'normal',
        marginBottom: 0,
        margin: mobile ? '1.5em' : '1em',
      }}
    />
  </Container>
)

LandingHeader.propTypes = {
  mobile: PropTypes.bool,
}

export default LandingHeader;