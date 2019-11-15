/**
 * LandingFooter
 * Component with hardcoded information to display a footer similar to the provided designs
 */
import React from 'react';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';

/**
 * A footer stolen from the examples provided by the semantic ui documentation whit beautiful
 * hardcoded data.
 *
 * @returns {Component}
 */
const LandingFooter = () => {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">DNA FAQ</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">How To Access</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default LandingFooter;
