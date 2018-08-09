import { Component } from 'react';

export default class BaseModule extends Component {
  render() {
    const { className } = this.props;

    let body = null;
    if(this.renderBody) {
      body = (
        <div className="module-body">{this.renderBody()}</div>
      );
    }

    let header = null;
    if(this.renderHeader) {
      header = (
        <div className="module-header">{this.renderHeader()}</div>
      );
    }
    return (
      <div className={`module ${className || ''}`}>
        {header}
        {body}
      </div>
    );
  }
}
