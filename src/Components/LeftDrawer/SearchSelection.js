import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const searchSelectionStyles = () => ({
  selectionField: {
    marginLeft: '1rem',
    width: '10%'
  },
  formControl: {
    marginLeft: '1rem',
    width: '10%',
    marginBottom: '1rem'
  },
  placeHolder: {
    color: 'white'
  }
});

const SearchSelection = ({
  classes,
  dropDownValues,
  handleChange,
  selectedValue
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel className={classes.placeHolder} htmlFor="select-multiple">
      Select Values
    </InputLabel>
    <Select value={selectedValue} onChange={handleChange}>
      {dropDownValues.map(data => (
        <MenuItem key={data} value={data}>
          {data}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default withStyles(searchSelectionStyles)(SearchSelection);
