import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import { GlobalModalStyles, setModalStyle } from '../GlobalStyles/index';
import Button from '../Buttons/index';

const padding = '0.5rem';

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
    <div style={setModalStyle()} className={classes.paper}>
      <div className={classes.flexBox}>
        <h3>Are you sure you want to delete this agent?</h3>
        <div>
          <Button
            handleClick={toggleDeleteModal}
            showIcon={false}
            text="No"
            border="'1px solid #ffcccb'"
            padding={padding}
            color="red"
          />
          <span style={{ marginLeft: '1rem' }} />
          <Button
            handleClick={deleteAgent}
            showIcon={true}
            text="Yes"
            border="1px solid #ADD8E6"
            padding={padding}
            color="blue"
          />
        </div>
      </div>
    </div>
  </Modal>
);

WarningModal.defaultProps = {
  isDeleteModalOn: false
};

WarningModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isDeleteModalOn: PropTypes.bool,
  toggleDeleteModal: PropTypes.func.isRequired,
  deleteAgent: PropTypes.func
};

export default withStyles(GlobalModalStyles)(WarningModal);
