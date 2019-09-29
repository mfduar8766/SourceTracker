import { fade } from '@material-ui/core/styles';

export const agentSearch = theme => ({
  appBar: {
    borderBottom: '1px solid lightgray',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  root: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    border: '1px solid lightgray',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
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
  selectionField: {
    marginLeft: '1rem',
    width: '10%'
  },
  formControl: {
    marginLeft: '1rem',
    width: '10%',
    marginBottom: '1rem'
  },
  placeHolder: {
    color: 'lightgray'
  }
});