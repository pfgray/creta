/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import ColorService from '../ui/ColorService';


const colorService = new ColorService();

export default ({app}) => {
  const {
    identity: { id, originator_id },
    attributes: {
      use: {
        icon,
        description
      }
    }
  } = app;
  var app_id = originator_id + id;

  var styles = {
      backgroundColor: colorService.getColorForString(app_id)
  };

  return (
    <div className='app-box'>
      <div className='app-box-header' style={styles}>
        {app.attributes.use.title.substring(0, 1)}
      </div>
      <div className='app-box-label'>{app.attributes.use.title}</div>
    </div>
  );
};
