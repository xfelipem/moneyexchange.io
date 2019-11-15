/**
 * Mobile
 * High Order Component which handles mobile view.
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment, Responsive, Sidebar, Menu } from 'semantic-ui-react';
import Header from '../components/Header';
import { getMinWidth, getMaxWidth } from '../helpers/semantic-ui';

/**
 * High Order Component which handles the display of components used in the mobile view
 *
 * @returns {Component}
 */
class MobileHoc extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getMinWidth}
        maxWidth={getMaxWidth()}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        ></Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: '20vh', padding: '1em 0em' }}
            vertical
          >
            <Header mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileHoc.propTypes = {
  children: PropTypes.node
};

export default MobileHoc;
