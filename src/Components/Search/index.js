import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { searchStyles } from './Utils/Styles';

const SearchComponent = ({ classes, handleSearch }) => (
  <div className={classes.root}>
    <div className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={handleSearch}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </div>
  </div>
);

export default withStyles(searchStyles)(SearchComponent);
