import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';

const FormField = ({
  handleBlur,
  handleChange,
  name,
  label,
  placeholder,
  errors,
  touched,
  fieldType,
  isDisabled,
}) => (
  <Field
    onBlur={handleBlur}
    onChange={handleChange}
    name={name}
    render={({ field, form }) => (
      <TextField
        type={fieldType}
        label={label}
        disabled={isDisabled}
        {...field}
        placeholder={placeholder}
        error={errors[name] && touched[name] ? true : false}
        helperText={form.errors[name]}
      />
    )}
  />
);

FormField.defaultProps = {
  fieldType: 'text'
};

FormField.propTypes = {
  fieldType: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export default FormField;
