import { Component } from 'react';
import css from 'styled-jsx/css';
import DatePicker from 'react-datepicker';
import datePickerCSS from '../../styles/vendor/react-datepicker/react-datepicker';

export default class extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isEmpty: true,
      datepickerFallback: false
    };


  }

  handleChange({target: { value }}) {
    this.setValue(value);
  }

  handleDate(date) {
    this.setValue(date);
  }

  handleFocus() {
    this.setState({ isEmpty: false });
  }

  handleBlur() {
    if(!this.value) {
      this.setState({ isEmpty: true });
    }
  }

  setValue(value) {
    this.value = value;
    if(this.value) {
      this.setState({ isEmpty: false });
    }

    if(this.props.onChange) {
      this.props.onChange(value, name);
    }
  }

  generateBaseInput() {
    const { name, type } = this.props;

    return <input
      className="form-control input-sp"
      type={ type || 'text' }
      name={ name }
      onChange={ this.handleChange }
      onFocus={ this.handleFocus }
      onBlur={ this.handleBlur }
    />;
  }

  generateDatePickerFallback() {
    return <>
      <DatePicker
        selected={ this.value }
        onChange={ this.handleDate }
        onBlur={ this.handleBlur }
      />
      <style jsx global>{datePickerCSS}</style>
    </>
  }

  componentDidMount() {
    const { name, type } = this.props;
    let Modernizr = (typeof window != "undefined" && window.Modernizr) ? window.Modernizr : null;
    if(type == 'date' && Modernizr && !Modernizr.inputtypes.date) {
      this.setState({ datepickerFallback: true });
    }
  }

  render() {
    const { name, label, type, error, className, ico } = this.props;
    const { isEmpty, datepickerFallback } = this.state;
    
    return (
      <div className={`form-group ${className} ${(!isEmpty) ? 'not-empty' : ''}`}>
        <label htmlFor={ name }>{ label }</label>

        <div className="form-input">
          { datepickerFallback ? this.generateDatePickerFallback() : this.generateBaseInput() }
          { ico && (
            <div className={`ico fi flaticon-${ico}`}></div>
          )}
        </div>

        { error &&  <p className="form-error txt-danger">{ error }</p> }

        <style jsx>{`
          .not-empty :global(input[type="date"] + .ico) { display: none; }
        `}</style>



      </div>
    );
  }
}
