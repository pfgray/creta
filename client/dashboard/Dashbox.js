/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <div className='panel dash-box'>
    <div className='title'>
      {props.link ? (
        <Link to={props.link}>{props.title}</Link>
      ) : props.title}
    </div>
    <div className='dash-box-body'>
      {props.children}
    </div>
  </div>
);
