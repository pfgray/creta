/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class HeaderContainer extends React.Component<any, any> {
  constructor(props){
    super(props);
  }
  render() {
    return Header(this.props);
  }
}

export default connect(
  state => {
    console.log("####got: ", state.routing);
    return ({
      currentUser: state.currentUser,
      pathname: state.routing.locationBeforeTransitions.pathname
    })
  },
  dispatch => ({
    dispatch: dispatch
  })
)(HeaderContainer);
