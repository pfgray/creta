
import * as React from 'react';
import AppList from './AppList';

export default (props) => {
  return <AppList {...props.appStore}
    dispatch={props.dispatch}
    apps={props.appStore.appStore} />;
};
