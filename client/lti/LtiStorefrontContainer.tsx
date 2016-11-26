/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect, ElementClass } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as _ from 'lodash';

import LtiStorefront from './LtiStorefront';

import { fetchStorefront, CancelSelectAppAction } from './appStore/AppStoreActions';

class LtiStorefrontContainer extends React.Component<any, any> {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchStorefront(this.props.lti.store));
  }
  render() {
    const { dispatch } = this.props;
    const selectedApp = this.props.appStore.selectedApp.map(id => (
      <Modal show={true} onHide={() => dispatch(CancelSelectAppAction())}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          <h4>Popover in a modal</h4>
        </Modal.Body>
      </Modal>
    ));
    return (
      <div>
        {selectedApp.getOrElse(() => <span/>)}
        <LtiStorefront {...this.props} />
      </div>
    );
  }
}

const connector = connect(
  state => ({
    appStore: state.appStore,
    lti: state.lti,
    env: state.env
  }),
  dispatch => ({ dispatch })
);

export default connector(LtiStorefrontContainer);
