import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

import { agentSearch } from './Utils/Styles';

const AgentSearch = ({
  classes,
  getQueryString,
  agencyDropDownValues,
  handleAgencySelection,
  selectedAgency,
}) => (
  <div className={classes.root}>
    <div className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={event => getQueryString(event)}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.placeHolder} htmlFor="select-multiple">
            Select Agency
          </InputLabel>
          <Select value={selectedAgency} onChange={handleAgencySelection}>
            {agencyDropDownValues.map(agency => (
              <MenuItem key={agency.value} value={agency.value}>
                {agency.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{' '}
      </Toolbar>
    </div>
  </div>
);

export default withStyles(agentSearch)(AgentSearch);
