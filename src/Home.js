import { Link } from '@reach/router';
import React, { Component } from 'react';

class Home extends Component {
  render() {
    const { userName } = this.props;

    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div className="display-4 text-primary mt-3 mb-2">
              Wine Inventory
            </div>
            <p className="lead">
              This app uses react and firebase to keep track of the wine in our
              coat closet in real time. Welcome to Closet Cav.
            </p>

            {userName == null && (
              <span>
                <Link to="/login" className="btn btn-outline-primary mr-2">
                  Log In
                </Link>
              </span>
            )}
            {userName && (
              <Link to="/winelist" className="btn btn-primary">
                Wine
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
