import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import { GlobalModalStyles, setModalStyle } from '../GlobalStyles/index';

const CommonModal = ({ classes, isOpen, toggleOpenModal, children }) => (
  <Modal open={isOpen} onClose={toggleOpenModal}>
    <div style={setModalStyle()} className={classes.paper}>
      {children}
    </div>
  </Modal>
);

CommonModal.defaultProps = {
  isOpen: false
};

CommonModal.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  toggleOpenModal: PropTypes.func.isRequired
};

export default withStyles(GlobalModalStyles)(CommonModal);
