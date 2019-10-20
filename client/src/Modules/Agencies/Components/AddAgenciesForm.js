import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../../Components/Buttons/index';
import FormTextField from '../../../Components/FormFields/index';
import { validateAgenciesFrom } from '../Utils';

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
  toggleOpenModal
}) => (
  <Grid container spacing={3} alignItems="center" justify="space-between">
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
            <FormTextField
              handleBlur={handleBlur}
              handleChange={handleChange}
              name="agencyName"
              label="agencyName"
              placeholder="Agency Name"
              errors={errors}
              touched={touched}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flexContainer}>
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="city"
                label="city"
                placeholder="City"
                errors={errors}
                touched={touched}
              />
              <div className={classes.margin} />
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="state"
                label="state"
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
                label="address"
                placeholder="Address"
                errors={errors}
                touched={touched}
              />
              <div className={classes.margin} />
              <FormTextField
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="zipCode"
                label="zipCode"
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
  toggleOpenModal: PropTypes.func
};

export default withFormik({
  enableReinitialize: true,
  validate: values => validateAgenciesFrom(values),
  handleSubmit: (values, formikBag) => {
    formikBag.setSubmitting(true);
    formikBag.props.toggleOpenModal(false);
  }
})(withStyles(addAgenciesStyles)(AddAgenciesForm));
