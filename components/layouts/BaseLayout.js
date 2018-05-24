import React from 'react';
import Head from 'next/head';
import * as layoutCSS from '../../styles/layout/core';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    };
  }

  renderHeader() {}
  renderBody() {}
  renderSidebar() {}
  renderFooter() {}
  renderMeta() {}

  render() {
    const { showSidebar } = this.state;

    return (
      <React.Fragment>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Delius+Unicase" rel="stylesheet"/>
          <script src="/static/js/modernizr/modernizr-custom.js"></script>
        </Head>

        <main className={`main-app ${showSidebar ? 'has-sidebar' : ''}`}>
          <header className="header-app">
            { this.renderHeader() }
          </header>
          <div className="body-app">
            { this.renderBody() }
          </div>
          <footer className="footer-app">
            { this.renderFooter() }
          </footer>
        </main>

        <div className={`sidebar-app ${showSidebar ? 'show' : ''}`}>
          { this.renderSidebar() }
        </div>

        {Object.values(layoutCSS).map((cssItem, i) => {
          return (<React.Fragment key={i}>
            <style jsx global>{ cssItem }</style>
          </React.Fragment>)
        })}

        { this.renderMeta() }

      </React.Fragment>
    );
  }

}
