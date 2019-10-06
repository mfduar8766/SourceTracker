import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { setModalStyle } from '../GlobalStyles/index';

const LoadingIcon = ({ color }) => (
  <div style={setModalStyle()}>
    <CircularProgress color={color} />
  </div>
);

export default LoadingIcon;