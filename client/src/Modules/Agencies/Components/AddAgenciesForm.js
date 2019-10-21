import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../../Components/Buttons/index';
import FormTextField from '../../../Components/FormFields/index';
import { validateAgenciesFrom } from '../Utils';
import { addNewAgency } from '../Services/index';

const addAgenciesStyles = () => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  form: {
    width: '100%',
    height: '100%'
  },
  margin: {
    marginLeft: '2rem'
  }
});

const AddAgenciesForm = ({
  classes,
  touched,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  toggleOpenModal,
  errorMessage
}) => (
  <Grid container spacing={3} alignItems="center" justify="space-between">
    {errorMessage && errorMessage}
    <Grid item xs={12}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12}>
            <div className={classes.flexContainer}>
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="agencyId"
                label="Agency Id"
                placeholder="Agency Id"
                errors={errors}
                touched={touched}
              />
              <div className={classes.margin} />
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="agencyName"
                label="Agency Name"
                placeholder="Agency Name"
                errors={errors}
                touched={touched}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flexContainer}>
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="city"
                label="City"
                placeholder="City"
                errors={errors}
                touched={touched}
              />
              <div className={classes.margin} />
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="state"
                label="State"
                placeholder="State"
                errors={errors}
                touched={touched}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flexContainer}>
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="address"
                label="Address"
                placeholder="Address"
                errors={errors}
                touched={touched}
              />
              <div className={classes.margin} />
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="zipCode"
                label="Zip Code"
                placeholder="Zip Code"
                errors={errors}
                touched={touched}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flexContainer}>
              <Button
                showIcon={false}
                handleClick={toggleOpenModal}
                color="red"
                border="1px solid red"
                text="Cancel"
              />
              <div className={classes.margin} />
              <Button
                color="green"
                border="1px sold green"
                isDisabled={isSubmitting}
                buttonType="submit"
                text="Submit"
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
);

AddAgenciesForm.propTypes = {
  classes: PropTypes.object.isRequired,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  toggleOpenModal: PropTypes.func,
  getNewAgency: PropTypes.func
};

export default withFormik({
  enableReinitialize: true,
  validate: values => validateAgenciesFrom(values),
  handleSubmit: (values, formikBag) => {
    const newAgency = {
      ...values,
      agencyId: parseInt(values.agencyId),
      totalAgents: 0,
      agents: []
    };
    addNewAgency(newAgency)
      .then(res => {
        if (res.data.status === 201) {
          const agency = res.data.agency;
          formikBag.setSubmitting(true);
          formikBag.props.toggleOpenModal(false);
          formikBag.props.getNewAgency(agency);
        }
      })
      .catch(error => {
        formikBag.setSubmitting(false);
        console.log(error);
        formikBag.props.setErrorMessage('Agency already exists.');
      });
  }
})(withStyles(addAgenciesStyles)(AddAgenciesForm));
