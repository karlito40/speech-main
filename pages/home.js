import Link from 'next/link';
import FormConnexion from '../components/forms/FormConnexion';
import BaseLayout from '../components/layouts/BaseLayout';
import * as layoutCSS from '../styles/layout/facade';
import React from 'react';

export default class extends BaseLayout {
  renderHeader() {

  }

  renderBody() {
    return <Link href="/contact"><a>Contact</a></Link>;
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
