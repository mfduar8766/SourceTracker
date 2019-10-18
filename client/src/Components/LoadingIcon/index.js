import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { setModalStyle } from '../GlobalStyles/index';

const LoadingIcon = ({ color }) => (
  <div style={setModalStyle()}>
    <CircularProgress color={color} />
  </div>
);

LoadingIcon.propTypes = {
  color: PropTypes.string.isRequired
};

export default LoadingIcon;
