import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import {
  GlobalModalStyles,
  setModalStyle
} from '../../../../../../Components/GlobalStyles/index';

const EditAgentsModal = ({
  isEditOn,
  classes,
  agentToEdit,
  touched,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  closeModal
}) => (
  <Modal
    aria-labelledby="Edit Agent"
    aria-describedby="Edit Agent Modal"
    open={isEditOn}
    onClose={closeModal}
  >
    <div style={setModalStyle()} className={classes.paper}>
      <Grid container justify="center" alignItems="center">
        <h3>Edit Agent {agentToEdit.agentId}</h3>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-start">
              <Grid item xs={12}>
                <Field
                  name="agentId"
                  render={({ field }) => (
                    <TextField
                      disabled
                      label="agentId"
                      {...field}
                      placeholder="agentId"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: '2rem' }} />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={7}
            >
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Field
                      name="firstName"
                      render={({ field }) => (
                        <TextField
                          disabled
                          label="firstName"
                          {...field}
                          placeholder="firstName"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="lastName"
                      render={({ field }) => (
                        <TextField
                          disabled
                          label="lastName"
                          {...field}
                          placeholder="lastName"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Field
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="startDate"
                      render={({ field, form }) => (
                        <TextField
                          className={classes.textField}
                          error={
                            errors.startDate && touched.startDate ? true : false
                          }
                          label="startDate"
                          type="date"
                          {...field}
                          placeholder="startDate"
                          helperText={form.errors.startDate}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      className={classes.textField}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="endDate"
                      render={({ field, form }) => (
                        <TextField
                          error={
                            errors.endDate && touched.endDate ? true : false
                          }
                          label="endDate"
                          type="date"
                          {...field}
                          placeholder="endDate"
                          helperText={form.errors.endDate}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.buttonContainer}>
              <div>
                <button
                  onClick={closeModal}
                  type="button"
                  className={classes.cancelButton}
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={classes.submitButton}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  </Modal>
);

const mapPropsToValues = ({ agentToEdit }) => {
  const { firstName, lastName, agentId, startDate, endDate } = agentToEdit;
  const formatDate = date => moment(new Date(date)).format('YYYY-MM-DD');
  return {
    firstName,
    lastName,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    agentId
  };
};

EditAgentsModal.propTypes = {
  isEditOn: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  agentToEdit: PropTypes.object,
  touched: PropTypes.bool,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  closeModal: PropTypes.func
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: mapPropsToValues,
  validate: values => {
    const errors = {};
    if (values.startDate === '') {
      errors.startDate = 'Invalid date';
    } else if (values.endDate === '') {
      errors.endDate = 'Invalid';
    } else if (moment(values.startDate).isSameOrAfter(values.endDate)) {
      errors.startDate = 'Invalid date.';
    } else if (moment(values.endDate).isSameOrBefore(values.startDate)) {
      errors.endDate = 'Invalid date.';
    }
    return errors;
  },
  handleSubmit: (values, formikBag) => {
    formikBag.setSubmitting(true);
    formikBag.props.closeModal();
    formikBag.props.getEditAgentFormValues(values);
  }
})(withStyles(GlobalModalStyles)(EditAgentsModal));
