/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import AppSquare from './AppSquare';

export default ({apps}) => {
  return apps.length < 1 ? (
    <div>You don't have any apps yet. Add some repositories to get some.</div>
  ) : (
    <div className='dashboard-app-list'>
      {apps.map((app, i) => (
        <AppSquare key={i} app={app} />
      ))}
    </div>
  );
};
