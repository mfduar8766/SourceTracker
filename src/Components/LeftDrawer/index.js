import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { drawerStyles } from './Utils/Styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const LeftDrawer = ({ history }) => {
  const classes = drawerStyles();
  const theme = useTheme();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const sideDrawerIcons = [
    {
      id: 0,
      name: 'Home',
      icon: <FontAwesomeIcon size="2x" className={classes.iconColor} icon={faHome} />,
      link: '/'
    },
    {
      id: 1,
      name: 'Agencies',
      icon: <FontAwesomeIcon size="2x" className={classes.iconColor} icon={faBuilding} />,
      link: '/agencies'
    },
    {
      id: 2,
      name: 'Agents',
      icon: (
        <FontAwesomeIcon size="2x" className={classes.iconColor} icon={faUserCircle} />
      ),
      link: '/agents'
    }
  ];
  useEffect(() => {}, [history]);

  const toggleDrawer = () => {
    setIsSideDrawerOpen(isSideDrawerOpen => !isSideDrawerOpen);
  };

  const navigateToPage = (event, link) => {
    event.preventDefault();
    history.push(link);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSideDrawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isSideDrawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => history.push('/')}
            variant="h6"
            noWrap
          >
            Source Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        onClick={toggleDrawer}
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
          <IconButton>
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
    </div>
  );
};

export default withRouter(LeftDrawer);
