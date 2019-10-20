import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import { Field } from 'formik';

const selectFieldStyles = () => ({
  selectionField: {
    marginLeft: ({ selectFieldMargin }) => selectFieldMargin || '1rem',
    width: ({ selectFieldWidth }) => selectFieldWidth || '50%'
  },

  formControl: {
    marginLeft: '1rem',
    width: ({ formControlWidth }) => formControlWidth || '50%',
    marginBottom: '1rem'
  },
  placeHolder: {
    color: ({ placeHolderColor }) => placeHolderColor || 'black'
  }
});

const SelectField = ({
  classes,
  placeHolder,
  dataArray,
  errors,
  handleBlur,
  handleChange,
  touched,
  name
}) => (
  <Field
    onBlur={handleBlur}
    onChange={handleChange}
    name={name}
    render={({ field, form }) => (
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.placeHolder} htmlFor="select-multiple">
          {placeHolder}
        </InputLabel>
        <Select
          name={name}
          onBlur={handleBlur}
          value={name}
          onChange={handleChange}
          error={errors[name] && touched[name] ? true : false}
          helperText={form.errors[name]}
          {...field}
        >
          {dataArray.map(agency => (
            <MenuItem key={agency.value} value={agency.value}>
              {agency.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

SelectField.propTypes = {
  classes: PropTypes.object.isRequired,
  dataArray: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  placeHolder: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  name: PropTypes.string
};

export default withStyles(selectFieldStyles)(SelectField);
