import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export default class Modal extends React.Component {
  state = { show: false, isAnimate: false };

  handleBlur = (e) => {
    if(
      (!this.modalNode || !this.modalNode.contains(e.relatedTarget))
      && document.activeElement != this.modalNode
    ) {
      this.setState({show: false});
    }
  }

  onExited = () => {
    if(this.props.onClose) {
      this.props.onClose();
    }

    this.setState({isAnimate: false});
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
    if(prevProps.active != this.props.active) {
      this.setState({show: this.props.active});
    }

    if(!prevState.show && this.state.show) {
      this.setState({isAnimate: true});
    }

    if(this.props.active && this.modalNode) {
      this.modalNode.focus();
    }
  }

  componentWillMount() {
    this.setState({ show: this.props.active });
  }

  renderModal() {
    const { children, active } = this.props;
    const { isAnimate } = this.state;

    return isAnimate ? (
      <CSSTransition
        in={this.state.show}
        appear={true}
        timeout={{enter: 700, exit: 250}}
        classNames="modal-container"
        onExited={this.onExited}
      >
        <div className="modal-container">
          <div
            ref={(node) => this.modalNode = node }
            className="modal"
            tabIndex="-1"
            onBlur={ this.handleBlur }
          >
            <div className="modal-body">
              { children }
            </div>
          </div>
        </div>
      </CSSTransition>
    ) : null;
  }

  render() {
    if(typeof document == "undefined") {
      return null;
    }

    return ReactDOM.createPortal(this.renderModal(), this.root);
  }
}
