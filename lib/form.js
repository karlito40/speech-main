import { Field } from '../components/controls';
import { validateChange } from './validator';

export const getFieldsComponent = (scope, fieldList, options) => {
  const useDynamicField = options && options.useDynamicField;

  const components = [];

  for(const fieldSchema of fieldList) {
    let fieldProps = {
      label: fieldSchema.label,
      name: fieldSchema.name,
      type: fieldSchema.type,
    };

    if(useDynamicField && fieldSchema.validator) {
      fieldProps.onChange = validateChange.bind(scope, {
        name: fieldSchema.name,
        validator: fieldSchema.validator,
        onValidate: options && options.onValidate
      });

      fieldProps.error = scope.state[`${fieldSchema.name}Error`];
    }

    if(options && options.props) {
      fieldProps = {...fieldProps, ...options.props}
    };

    components.push(<Field {...fieldProps} />);
  }

  return components;
}
