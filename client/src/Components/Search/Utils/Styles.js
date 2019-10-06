import { fade } from '@material-ui/core/styles';

export const searchStyles = theme => ({
  appBar: {
    borderBottom: ({ borderBottom }) => borderBottom || '1px solid lightgray',
    backgroundColor: ({ backgroundColor }) => backgroundColor || 'white',
    width: ({ width }) => width || '100%',
    maxHeight: ({ maxHeight }) => maxHeight || '100%',
    margin: 0,
    padding: 0
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: ({ flexDirection }) => flexDirection || 'column',
    alignItems: 'center',
    width: '100%',
    maxHeight: '50%',
    marginTop: '1rem'
  },
  root: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    border: ({ isDisabled }) => (isDisabled ? 'gray' : '1px solid lightgray'),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: ({ isDisabled }) =>
      isDisabled ? 'gray' : fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: ({ isDisabled }) =>
        isDisabled ? 'gray' : fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  iconColor: {
    color: ({ isDisabled }) => (isDisabled ? 'white' : 'lightgray')
  }
});

export const globalSearchResults = () => ({
  list: {
    zIndex: 999,
    height: '100%',
    width: '100%'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    }
  }
});
