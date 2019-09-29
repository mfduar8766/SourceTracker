export const editAgentsModalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
  submitButton: {
    border: '1px solid #ADD8E6',
    padding: '0.5rem',
    color: 'blue',
    marginLeft: '1rem',
    cursor: 'pointer'
  },
  cancelButton: {
    border: '1px solid #ffcccb',
    padding: '0.5rem',
    color: 'red',
    cursor: 'pointer'
  },
  textField: {
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  },
  buttonContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  warningModal: {
    position: 'absolute',
    width: 600,
    height: 100,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const setModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};
