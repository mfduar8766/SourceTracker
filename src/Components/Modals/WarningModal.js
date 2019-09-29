import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import { editAgentsModalStyles, setModalStyle } from './Styles';

const WarningModal = ({
  classes,
  isDeleteModalOn,
  toggleDeleteModal,
  deleteAgent
}) => (
  <Modal
    aria-labelledby="Edit Agent"
    aria-describedby="Edit Agent Modal"
    open={isDeleteModalOn}
    onClose={toggleDeleteModal}
  >
    <div style={setModalStyle()} className={classes.warningModal}>
      <div className={classes.flexBox}>
        <h3>Are you sure you want to delete this agent?</h3>
        <div>
          <button className={classes.cancelButton} onClick={toggleDeleteModal}>
            No
          </button>
          <button
            className={classes.submitButton}
            onClick={deleteAgent}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default withStyles(editAgentsModalStyles)(WarningModal);
