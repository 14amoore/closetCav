import React, { Component } from 'react';
import { GiWineGlass } from 'react-icons/gi';
import { Link } from '@reach/router';

class Navigation extends Component {
  render() {
    const { userName, logOutUser, wineCount } = this.props;
    // console.log(wineCount);
    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <GiWineGlass className="mr-1" /> Closet Cav
          </Link>
          <div className="navbar-nav ml-auto">
            {userName && <span className="navbar-brand">{wineCount}</span>}
            {userName && (
              <Link className="nav-item nav-link" to="/winelist">
                wine list
              </Link>
            )}
            {userName && (
              <Link className="nav-item nav-link" to="/favorites">
                favorites
              </Link>
            )}
            {!userName && (
              <Link className="nav-item nav-link" to="/login">
                log in
              </Link>
            )}

            {userName && (
              <Link
                className="nav-item nav-link"
                to="/login"
                onClick={(e) => {
                  logOutUser(e);
                }}
              >
                log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
