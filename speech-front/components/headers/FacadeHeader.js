import React from 'react';
import Logo from '../sprites/Logo';

export default class extends React.Component {

  handleConnexionLink(e) {
    e.preventDefault();
    this.props.onConnexionLink(e)
  }

  render() {
    const { showCloseConnexion } = this.props;

    return (
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/connexion" onClick={ this.handleConnexionLink.bind(this) }>
              <div className="nav-label">Connexion</div>
              {showCloseConnexion && <div className="ico ico-close"></div>}
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
