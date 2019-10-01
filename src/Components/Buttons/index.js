import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const buttonStyles = () => ({
  button: {
    padding: ({ padding }) => padding || '0.5rem',
    border: ({ border }) => border || '1px solid lightblue',
    color: ({ color }) => color || 'green',
    cursor: ({ cursor }) => cursor || 'pointer'
  },
  buttonText: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconStyles: {
    marginLeft: '0.2rem'
  }
});

const Button = ({
  classes,
  text,
  buttonIcon,
  showIcon,
  iconSize,
  handleClick
}) => (
  <button
    onClick={handleClick}
    className={classes.button}
  >
    <div className={classes.buttonText}>
      <Typography>{text}</Typography>
      {showIcon && (
        <FontAwesomeIcon
          className={classes.iconStyles}
          icon={buttonIcon || faPlus}
          size={iconSize || '1x'}
        />
      )}
    </div>
  </button>
);

export default withStyles(buttonStyles)(Button);
