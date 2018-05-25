import React from 'react';
import Head from 'next/head';
import * as layoutCSS from '../../styles/layouts/core';

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

  handleBlurSidebar(e) {
    e.stopPropagation();
    if(
      (!this.sidebarNode || !this.sidebarNode.contains(e.relatedTarget))
      && document.activeElement != this.sidebarNode
    ) {
      // Need to be handle after the connexionLink action
      setTimeout(() => this.setState({ showSidebar: false }), 20);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.showSidebar && this.sidebarNode) {
      this.sidebarNode.focus();
    }
  }

  render() {
    const { showSidebar } = this.state;

    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
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

        <div
          className={`sidebar-app ${showSidebar ? 'show' : ''}`}
          tabIndex="-1"
          onBlur={ this.handleBlurSidebar.bind(this) }
          ref={ (node) => this.sidebarNode = node }
        >
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
