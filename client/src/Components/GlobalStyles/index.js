export const GlobalModalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: ({ modalWidth }) => modalWidth || 600,
    height: ({ modalHeight }) => modalHeight || 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3)
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

export const setModalStyle = (backgroundColor) => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: backgroundColor || 'white'
  };
};
