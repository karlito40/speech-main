import React from 'react';
import Logo from '../sprites/Logo';
import Link from 'next/link';

export default class extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <Logo dim="min"/>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/d/visited">
              <a className="nav-link">
                <div className="nav-label">Visites</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/d/conversations">
              <a className="nav-link">
                <div className="nav-label">Messages</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/d/revealed">
              <a className="nav-link">
                <div className="nav-label">Révélations</div>
                <div className="counter">8</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/d/favs">
              <a className="nav-link">
                <div className="nav-label">Favoris</div>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/d/settings">
              <a className="nav-link">
                <div className="nav-label">
                  <i className="fi flaticon-setting-tool"></i>
                </div>
              </a>
            </Link>
          </li>


          <li className="nav-item">
            <Link href="/d/search">
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
