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
}) => (
  <List className={classes.list}>
    <>
      {listValues &&
        listValues.length &&
        listValues.map(value => (
          <ListItem
            onClick={event => navigateToSelectedResult(event, value)}
            className={classes.listItem}
            key={value.agencyId}
          >
            <ListItemText>{value.agencyName}</ListItemText>
          </ListItem>
        ))}
    </>
  </List>
);

export default withStyles(globalSearchResults)(GlobalSearchResults);
