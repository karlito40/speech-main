import { Component } from 'react';

export default class extends Component {
  render() {
    const { children, className, onClick } = this.props;

    return (
      <button className={ `btn-sp ${className}` } onClick={ onClick }>
        { children }
      </button>
    );
  }
}
