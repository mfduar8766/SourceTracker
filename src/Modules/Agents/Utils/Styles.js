export const agentsTableStyles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    width: '100%',
    height: '100%'
  },
  editButton: {
    color: 'blue',
    cursor: 'pointer'
  },
  deleteButton: {
    color: 'red',
    cursor: 'pointer',
    marginLeft: '1rem'
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center'
  },
  tableRow: {
    cursor: 'pointer',
    width: '100%',
    height: '100%'
  },
  loadingIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
