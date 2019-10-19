import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faHome,
  faUsers,
  faChartBar,
  faCog
} from '@fortawesome/free-solid-svg-icons';

const LeftDrawer = ({
  classes,
  theme,
  openSettings,
  navigateToPage,
  isSideDrawerOpen,
  setIsSideDrawerOpen
}) => {
  const sideDrawerIcons = [
    {
      id: 0,
      name: 'Home',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faHome}
        />
      ),
      link: '/'
    },
    {
      id: 1,
      name: 'Agencies',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faUsers}
        />
      ),
      link: '/agencies'
    },
    {
      id: 2,
      name: 'Agents',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faUserCircle}
        />
      ),
      link: '/agents'
    },
    {
      id: 3,
      name: 'Reports',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faChartBar}
        />
      ),
      link: '/reports'
    },
    {
      id: 4,
      name: 'Settings',
      icon: (
        <FontAwesomeIcon
          className={classes.iconColor}
          onClick={event => openSettings(event)}
          icon={faCog}
          size="2x"
        />
      )
    }
  ];
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isSideDrawerOpen,
        [classes.drawerClose]: !isSideDrawerOpen
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isSideDrawerOpen,
          [classes.drawerClose]: !isSideDrawerOpen
        })
      }}
      open={isSideDrawerOpen}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => setIsSideDrawerOpen(false)}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon className={classes.chevronLeft} />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {sideDrawerIcons.map(icon => (
          <ListItem
            onClick={event => navigateToPage(event, icon.link)}
            className={classes.listItem}
            button
            key={icon.id}
          >
            <ListItemIcon>{icon.icon}</ListItemIcon>
            <ListItemText>{icon.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  openSettings: PropTypes.func,
  navigateToPage: PropTypes.func,
  isSideDrawerOpen: PropTypes.bool,
  setIsSideDrawerOpen: PropTypes.func
};

export default LeftDrawer;
