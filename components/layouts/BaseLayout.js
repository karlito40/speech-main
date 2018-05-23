import React from 'react';
import * as layoutCSS from '../../styles/layout/core';

export default class extends React.Component {

  renderHeader() {}
  renderBody() {}
  renderSidebar() {}
  renderFooter() {}
  renderMeta() {}
  
  render() {
    return (
      <React.Fragment>
        <main>
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

        <div className="sidebar-app">
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
