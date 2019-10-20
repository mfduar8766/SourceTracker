import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormField from '../../../../Components/FormFields/index';
import Button from '../../../../Components/Buttons/index';
import { validateEditAgent } from '../Utils';

const editAgentStyles = () => ({
  buttonContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

const EditAgentForm = ({
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
  <Grid container justify="center" alignItems="center">
    <h3>Edit Agent {agentToEdit.agentId}</h3>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="flex-start">
          <Grid item xs={12}>
            <FormField
              name="agentId"
              isDisabled={true}
              handleBlur={handleBlur}
              handleChange={handleChange}
              label="Agent Id"
              placeholder="Agent Id"
              errors={errors}
              touched={touched}
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
                <FormField
                  name="firstName"
                  isDisabled={true}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  label="First Name"
                  placeholder="First Name"
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  name="lastName"
                  isDisabled={true}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  label="Last Name"
                  placeholder="Last Name"
                  errors={errors}
                  touched={touched}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={4}>
                <FormField
                  name="startDate"
                  fieldType="date"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  label="Start Date"
                  placeholder="Start Date"
                  errors={errors}
                  touched={touched}
                />
              </Grid>
              <Grid item xs={4}>
                <FormField
                  name="endDate"
                  fieldType="date"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  label="End Date"
                  placeholder="End Date"
                  errors={errors}
                  touched={touched}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button
            showIcon={false}
            handleClick={closeModal}
            color="red"
            border="1px solid red"
            text="Cancel"
          />
          <div style={{ marginLeft: '2rem' }} />
          <Button
            showIcon={false}
            color="green"
            border="1px sold green"
            isDisabled={isSubmitting}
            buttonType="submit"
            text="Submit"
          />
        </div>
      </form>
    </Grid>
  </Grid>
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

EditAgentForm.propTypes = {
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
  validate: values => validateEditAgent(values),
  handleSubmit: (values, formikBag) => {
    formikBag.setSubmitting(true);
    formikBag.props.closeModal();
    formikBag.props.getEditAgentFormValues(values);
  }
})(withStyles(editAgentStyles)(EditAgentForm));
