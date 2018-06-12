import { Component } from 'react';
import DatePicker from 'react-datepicker';
import datePickerCSS from '../../styles/vendor/react-datepicker/react-datepicker';

export class Input extends Component {

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

  handleChange(e) {
    const { target: { value } } = e;

    this.setValue(value);

    if(this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleDate(date) {
    this.setValue(date);
  }

  handleFocus(e) {
    this.setState({ isEmpty: false });

    if(this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleBlur(e) {
    if(!this.value) {
      this.setState({ isEmpty: true });
    }

    if(this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  setValue(value) {
    this.value = value;
    if(this.value) {
      this.setState({ isEmpty: false });
    }
  }

  generateBaseInput() {
    const { name, type } = this.props;
    const events = {
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onDrop: this.props.onDrop,
      onDragStart: this.props.onDragStart
    };

    if(type && type == "select") {
      return (
        <select className="form-control select-sp"
          name={ name }
          { ...events }>
          <option value="0">{ this.props.label }</option>
          {this.props.values && this.props.values.map((v, index) => (
            <option key={index} value={v.val}>{v.label}</option>
          ))}
        </select>
      );
    }

    return <input
      className="form-control input-sp"
      type={ type || 'text' }
      name={ name }
      {... events }
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
    const inputType = type || "text";

    return (
      <div className={`form-group ${className} ${(!isEmpty) ? 'not-empty' : ''}`}>
        <div className="body-form-group">
          { inputType != "select" && <label htmlFor={ name }>{ label }</label> }

          <div className="form-input">
            { datepickerFallback ? this.generateDatePickerFallback() : this.generateBaseInput() }
            { ico && (
              <div className={`ico fi flaticon-${ico}`}></div>
            )}
          </div>
        </div>

        { error &&  <div className="form-error txt-danger">{ error }</div> }

        <style jsx>{`
          .not-empty :global(input[type="date"] + .ico) { display: none; }
        `}</style>

      </div>
    );
  }
}
