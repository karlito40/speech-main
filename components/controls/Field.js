import { Component } from 'react';
import { Input } from '../controls';
import { Field as FieldForm } from 'redux-form'
import Modal from '../Modal';

const renderInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Input
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

export const Field = (props) => (
  <FieldForm {...props} component={renderInput}/>
);
