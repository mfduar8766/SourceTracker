import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export const drawerStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: '4rem'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#4C4C4C'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '50%',
    width: '100%'
  },
  titleWidth: {
    width: '10%'
  },
  title: {
    cursor: 'pointer'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: '#4C4C4C',
    color: 'white'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
    },
    backgroundColor: '#4C4C4C',
    color: 'white',
    '&:hover': {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      backgroundColor: '#4C4C4C',
      color: 'white'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
  },
  iconColor: {
    color: 'black',
    cursor: 'pointer'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black'
    }
  },
  chevronLeft: {
    color: 'white'
  },
  settings: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '5%'
  }
}));
