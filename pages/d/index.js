import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';

export default class Index extends AccountLayout {

  renderBody() {
    return (
      <React.Fragment>
        <section className="test">Index page</section>
      </React.Fragment>
    );
  }

}
