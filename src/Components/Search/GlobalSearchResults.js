import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const GlobalSearchResults = ({ listValues }) => (
  <List style={{ zIndex: 999 }}>
    <>
      {listValues &&
        listValues.length &&
        listValues.map(value => (
          <ListItem key={value.agencyId}>
            <ListItemText style={{ color: 'black' }} >{value.agencyName}</ListItemText>
          </ListItem>
        ))}
    </>
  </List>
);

export default GlobalSearchResults;
