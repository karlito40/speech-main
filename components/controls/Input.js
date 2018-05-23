import { Component } from 'react';
import css from 'styled-jsx/css';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: true };
  }

  handleChange({target: { value }}) {
    this.value = value;
    if(this.value) {
      this.setState({ isEmpty: false });
    }

    if(this.props.onChange) {
      this.props.onChange(value, name);
    }
  }

  handleFocus() {
    this.setState({isEmpty: false});
  }

  handleBlur() {
    if(!this.value) {
      this.setState({ isEmpty: true });
    }
  }

  render() {
    const { name, label, type, error, className, ico } = this.props;
    const { isEmpty } = this.state;

    return (
      <div className={`form-group ${className} ${(!isEmpty) ? 'not-empty' : ''}`}>
        <label htmlFor={ name }>{ label }</label>

        <div className="form-input">
          <input
            className="form-control"
            type={ type || 'text' }
            name={ name }
            onChange={ this.handleChange.bind(this) }
            onFocus={ this.handleFocus.bind(this) }
            onBlur={ this.handleBlur.bind(this) }
          />
          { ico && (
            <div className={`ico fi flaticon-${ico}`}></div>
          )}
        </div>

        { error &&  <p className="form-error txt-danger">{ error }</p> }
      </div>
    );
  }
}
