import React from 'react';
import PropTypes from 'prop-types';

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
    marginLeft: '0.3rem'
  }
});

const Button = ({
  classes,
  text,
  buttonIcon,
  showIcon,
  iconSize,
  handleClick,
  showText,
  buttonType,
  isDisabled
}) => (
  <button
    disabled={isDisabled}
    type={buttonType}
    onClick={handleClick}
    className={classes.button}
  >
    <div className={classes.buttonText}>
      {showText && <Typography>{text}</Typography>}
      {showIcon && (
        <FontAwesomeIcon
          className={classes.iconStyles}
          icon={buttonIcon}
          size={iconSize}
        />
      )}
    </div>
  </button>
);

Button.defaultProps = {
  showIcon: true,
  showText: true,
  isDisabled: false,
  iconSize: '1x',
  buttonIcon: faPlus,
  buttonType: 'button'
};

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  handleClick: PropTypes.func,
  showIcon: PropTypes.bool,
  showText: PropTypes.bool,
  isDisabled: PropTypes.bool,
  iconSize: PropTypes.string,
  buttonIcon: PropTypes.object
};

export default withStyles(buttonStyles)(Button);
