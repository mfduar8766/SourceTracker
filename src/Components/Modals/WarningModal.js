import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import {
  GlobalModalStyles,
  setModalStyle
} from '../../Components/GlobalStyles/index';
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
            showText={true}
            text="No"
            border="'1px solid #ffcccb'"
            padding={padding}
            color="red"
          />
          <span style={{ marginLeft: '1rem' }} />
          <Button
            handleClick={deleteAgent}
            showText={true}
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

export default withStyles(GlobalModalStyles)(WarningModal);
