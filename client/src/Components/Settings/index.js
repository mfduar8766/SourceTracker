import React, { useContext } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { StateContext } from '../../Store/index';
import { addUser } from '../../Store/actions';

const settingsStyle = () => ({
  selectionField: {
    width: '50%'
  },
  formControl: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  placeHolder: {
    color: 'white'
  },
  currentUser: {
    color: 'white'
  }
});

const Settings = ({ classes }) => {
  const { store, dispatch } = useContext(StateContext);
  const user = store.user;
  const usersArray = [
    {
      value: 'agencyOwner',
      label: 'Agency Owner'
    },
    {
      value: 'client',
      label: 'Client'
    }
  ];

  const handleChange = event => {
    const newUser = event.target.value;
    dispatch(addUser({ newUser }));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.placeHolder} htmlFor="select-multiple">
        Current User: {user}
      </InputLabel>
      <Select
        className={classes.currentUser}
        value={user}
        onChange={handleChange}
      >
        {usersArray.map(userName => (
          <MenuItem key={userName.value} value={userName.label}>
            {userName.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(settingsStyle)(Settings);
