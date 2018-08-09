import React from 'react';
import Logo from '../sprites/Logo';
import Link from 'next/link';
import { connect } from 'react-redux';

class MemberHeader extends React.Component {
  render() {
    const {profileApp} = this.props;

    return (
      <nav className="navbar">
        <Logo dim="min"/>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/member/visited">
              <a className="nav-link">
                <div className="nav-label">Visites</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/member/conversations">
              <a className="nav-link">
                <div className="nav-label">Messages</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/member/revealed">
              <a className="nav-link">
                <div className="nav-label">Révélations</div>
                {profileApp.askReceived.length &&
                  <div className="counter">{profileApp.askReceived.length}</div>
                }
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/member/favs">
              <a className="nav-link">
                <div className="nav-label">Favoris</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/member/settings">
              <a className="nav-link">
                <div className="nav-label">
                  <i className="fi flaticon-setting-tool"></i>
                </div>
              </a>
            </Link>
          </li>


          <li className="nav-item">
            <Link href="/member/search">
              <a className="nav-link">
                <div className="nav-label">
                  <i className="fi flaticon-zoom-tool"></i>
                </div>
              </a>
            </Link>
          </li>

        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({profileApp}) => {
  return {
    profileApp
  };
};

export default connect(mapStateToProps)(MemberHeader);
