/**
 * Mobile
 * High Order Component which handles desktop views.
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Responsive, Visibility, Segment } from 'semantic-ui-react';
import Header from '../components/Header';
import { getMinWidth } from '../helpers/semantic-ui';

/**
 * High Order Component which handles the display of components used in the desktop view.
 *
 * @returns {Component}
 */
class DesktopHoc extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getMinWidth} minWidth={getMinWidth()}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: '35vh', padding: '1em 0em' }}
            vertical
          >
            <Header />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopHoc.propTypes = {
  children: PropTypes.node
};

export default DesktopHoc;
