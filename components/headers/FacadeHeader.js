import React from 'react';
import Logo from '../sprites/Logo';

export default class extends React.Component {

  handleConnexionLink(e) {
    e.preventDefault();
    if(this.props.onConnexionLink) {
      this.props.onConnexionLink()
    }
  }

  render() {
    return (
      <nav className="navbar">
        <Logo dim="min"/>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link"
              href="/connexion"
              onClick={ this.handleConnexionLink.bind(this) }>Connexion</a>
          </li>
        </ul>
      </nav>
    );
  }
}
