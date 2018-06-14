import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

class ProfilePicsForm extends Component {
  state = {}

  constructor(props){
    super(props)
    this.saveField = debounce(this.saveField, 150);
  }

  saveField = (name, value) => {
    const { id } = this.props.profileApp;
    const field = { [name]: value };

    this.props.onEdit({
      ...field,
      ...{ _params: { id } }
    });
  }

  render() {
    const { profileAppIsLoading } = this.props;

    return (
      <form className="form-pics-profile">
        <Button className="btn-primary is-basis">
          Ajouter
        </Button>
      </form>
    );
  }

}


const mapStateToProps = ({profileAppIsLoading, profileApp}) => {
  return {
    profileAppIsLoading,
    profileApp,
    initialValues: profileApp
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: (data) => dispatch(actionsApi.putProfileApp(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'profilePicsForm',
  })(ProfilePicsForm));
