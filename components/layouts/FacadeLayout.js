import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as layoutCSS from '../../styles/layouts/facade';
import ConnexionForm from '../forms/ConnexionForm';
import FacadeHeader from '../headers/FacadeHeader';
import BaseLayout from './BaseLayout';
import Router from 'next/router';

export default class extends BaseLayout {

  static async getInitialProps({ reduxStore: { getState }, res }) {
    const { userApp } = getState();
    const props = {};

    if(!userApp) {
      return props;
    }

    if (res) {
      res.writeHead(302, { Location: '/d'});
      res.end();
    } else {
      Router.push('/d');
    }

    return props;
  }

  handleConnexionLink(e) {
    if(!this.state.showSidebar) {
      this.setState({ showSidebar: true });
    }
  }

  renderHeader() {
    return <FacadeHeader
      onConnexionLink={ this.handleConnexionLink.bind(this) }
      showCloseConnexion={ this.state.showSidebar }
    />;
  }


  renderSidebar() {
    return <ConnexionForm/>;
  }

  renderFooter() {
    return (<React.Fragment>
      <span>© 2018</span>
      <Link href="/contact"><a>Contact</a></Link>
      <Link href="/privacy"><a>Confidentialité</a></Link>
    </React.Fragment>);
  }

  renderMeta() {
    return (<React.Fragment>
      {Object.values(layoutCSS).map((cssItem, i) => {
        return (<React.Fragment key={i}>
          <style jsx global>{ cssItem }</style>
        </React.Fragment>)
      })}
    </React.Fragment>);
  }

}
