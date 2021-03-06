/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import Dashbox from './Dashbox';
import { fetchDashboard } from './DashboardActions';
import AppList from './AppList.tsx';
import PeerList from './PeerList.tsx';
import StorefrontList from './StorefrontList.tsx';
import Loadable from '../ui/Loadable';

const mapStateToProps = (state) => {
  return state.dashboard;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitioningOut: true,
      transitioningTo: null
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchDashboard());
  }
  transitionOut(link, cb) {
    // set transitioning,
    // wait for a bit, then call callback
    this.setState({
      transitioningOut: true,
      transitioningTo: link
    });
    setTimeout(cb, 500);
  }
  render() {
    const appsTitle = (<div>Apps</div>);
    const repositoresTitle = <Link to='/repos'>Repositories</Link>;
    return (
      <Loadable
        loading={!this.props.apps}
        className="main-loader"
        content={() => (
          <Grid className='dash'>
            <Row>
              <Col lg={6} md={12}>
                <Dashbox title={appsTitle}>
                  <AppList apps={this.props.apps}/>
                </Dashbox>
              </Col>
              <Col lg={6} md={12}>
                <Dashbox title={repositoresTitle}>
                  <PeerList peers={this.props.peers}/>
                </Dashbox>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Dashbox title='Storefronts' link='/storefronts'>
                  <StorefrontList storefronts={this.props.storefronts}/>
                </Dashbox>
              </Col>
            </Row>
          </Grid>
        )} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
