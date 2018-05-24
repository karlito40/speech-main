import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as layoutCSS from '../../styles/layout/facade';
import ConnexionForm from '../forms/ConnexionForm';
import FacadeHeader from '../headers/FacadeHeader';
import BaseLayout from './BaseLayout';


export default class extends BaseLayout {
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
    return <ConnexionForm className="motion m-rtl"/>;
  }

  renderFooter() {
    return <Link href="/contact"><a>Contact</a></Link>;
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
