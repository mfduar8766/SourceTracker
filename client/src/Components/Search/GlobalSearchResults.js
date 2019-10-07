import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import { globalSearchResults } from './Utils/Styles';

const GlobalSearchResults = ({
  classes,
  listValues,
  navigateToSelectedResult
}) => {
  if (!Array.isArray(listValues)) {
    return <div className={classes.errorMessage}>No records found.</div>;
  }
  return (
    <List className={classes.list}>
      {listValues.map(value => (
        <ListItem
          onClick={event => navigateToSelectedResult(event, value)}
          className={classes.listItem}
          key={value.agencyId || value.agentId || value.id}
        >
          <ListItemText>
            {value.agencyName
              ? value.agencyName
              : `${value.firstName} ${value.lastName}`}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(globalSearchResults)(GlobalSearchResults);
