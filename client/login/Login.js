
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <div>
            <Link className='btn link-btn clear-btn' to='/login/email'>
              <i className="fa fa-envelope-o"></i>
              <span>log in with email</span>
            </Link>
          </div>
          <div>
            <a className='btn link-btn clear-btn' href='/auth/google'>
              <i className="fa fa-google"></i>
              <span>log in with google</span>
            </a>
          </div>
          <div>
            (more to come).
          </div>
        </div>
      </div>
    );
  }
});
