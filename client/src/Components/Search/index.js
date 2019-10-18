import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { searchStyles } from './Utils/Styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import GlobalSearchResults from './GlobalSearchResults';

const SearchComponent = ({
  classes,
  handleSearch,
  isDisabled,
  showResultsList,
  listValues,
  navigateToSelectedResult,
  errorMessage
}) => (
  <div className={classes.appBar}>
    <Toolbar className={classes.toolBar}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <FontAwesomeIcon
            className={classes.iconColor}
            size="2x"
            icon={isDisabled ? faBan : faSearch}
          />
        </div>
        <InputBase
          disabled={isDisabled}
          onChange={handleSearch}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      {showResultsList && (
        <>
          {errorMessage ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              {errorMessage}
            </div>
          ) : (
            <GlobalSearchResults
              navigateToSelectedResult={navigateToSelectedResult}
              listValues={listValues}
            />
          )}
        </>
      )}
    </Toolbar>
  </div>
);

SearchComponent.defaultProps = {
  isDisabled: false,
  showResultsList: false,
  listValues: null,
};

SearchComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  showResultsList: PropTypes.bool,
  listValues: PropTypes.array,
  navigateToSelectedResult: PropTypes.func,
  errorMessage: PropTypes.string
};

export default withStyles(searchStyles)(SearchComponent);
