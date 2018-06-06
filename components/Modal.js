import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  handleBlur = (e) => {
    if(
      (!this.modalNode || !this.modalNode.contains(e.relatedTarget))
      && document.activeElement != this.modalNode
    ) {
      this.props.onClose();
    }
  }

  constructor(props) {
    super(props);

    if(typeof document != "undefined") {
      this.root = document.getElementById('modal-root')
      if(!this.root) {
        this.root = document.createElement('div');
        this.root.setAttribute('id', 'modal-root');
        document.body.appendChild(this.root);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.active && this.modalNode) {
      this.modalNode.focus();
    }
  }

  renderModal() {
    const { children } = this.props;
    return (<div className="modal-container">
      <div
        ref={(node) => this.modalNode = node }
        className="modal"
        tabIndex="-1"
        onBlur={ this.handleBlur }>
        { children }
      </div>
    </div>);
  }

  render() {
    const { active } = this.props;

    if(!active || typeof document == "undefined") {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), this.root);
  }
}
