import React from 'react';
import Link from 'next/link';
import FormConnexion from '../components/forms/FormConnexion';
import BaseLayout from '../components/layouts/BaseLayout';
import FacadeHeader from '../components/headers/FacadeHeader';
import * as layoutCSS from '../styles/layout/facade';

export default class extends BaseLayout {

  handleConnexionLink() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  renderHeader() {
    return <FacadeHeader onConnexionLink={ this.handleConnexionLink.bind(this) }/>;
  }

  renderBody() {
    // return <Link href="/contact"><a>Contact</a></Link>;
  }

  renderSidebar() {
    return <FormConnexion/>;
  }

  renderFooter() {

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
