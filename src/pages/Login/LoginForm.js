/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Field } from 'react-final-form';
import { withStyles } from '@mui/styles';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material';

/* use vdt login form whenever that is updated */
// import { LoginForm } from '@vidispine/vdt-materialui';

const styles = ({ spacing }) => ({
  root: {
    marginTop: spacing(1),
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: '.75rem',
    },
    '& .MuiInputBase-input': {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  text: {},
});

const Input = withStyles(styles)(
  ({
    input: { name, onChange, value, ...inputProps } = {},
    meta: { touched, error, submitError } = {},
    helperText = '\u00a0',
    classes,
    className,
    FormControlProps = {},
    ...props
  }) => (
    <FormControl classes={{ root: classes.root }} {...FormControlProps}>
      <TextField
        classes={{ root: classes.text }}
        name={name}
        helperText={touched && (error || submitError) ? error || submitError : helperText}
        error={(error || submitError) && touched}
        inputProps={inputProps}
        onChange={onChange}
        value={value}
        {...props}
      />
    </FormControl>
  ),
);

const Submit = ({ submitting, children }) => (
  <Button type="submit" disabled={submitting}>
    <Box position="relative">
      <Box position="absolute" height={1} width={1} display={submitting ? 'inherit' : 'none'}>
        <CircularProgress size={24} />
      </Box>
      <Box>{children}</Box>
    </Box>
  </Button>
);

export const isUrl = (value = '') => {
  const helperText = 'Not a URL';
  const expression = /https?:\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);
  const matches = value.match(regex);
  return matches ? null : helperText;
};

const LoginForm = ({ onSubmit = () => null, helperText, initialValues }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    subscription={{ submitting: true, submitError: true }}
    render={({ handleSubmit, submitting, submitError }) => (
      <form onSubmit={handleSubmit}>
        <Box>
          <Field
            name="serverUrl"
            component={Input}
            type="text"
            label="Vidispine API Server"
            validate={isUrl}
            variant="standard"
            fullWidth
          />
          <Field
            name="userName"
            component={Input}
            type="text"
            label="Username"
            validate={(value) => (value ? undefined : 'Required')}
            variant="standard"
            fullWidth
          />
          <Field
            name="password"
            component={Input}
            type="password"
            label="Password"
            validate={(value) => (value ? undefined : 'Required')}
            variant="standard"
            fullWidth
          />
        </Box>
        <Box py={helperText || submitError ? 0 : 0.8} my={1}>
          {submitError && <FormHelperText error>{submitError}</FormHelperText>}
        </Box>
        <Box>
          <Submit type="submit" submitting={submitting} fullWidth>
            Login
          </Submit>
        </Box>
      </form>
    )}
  />
);

export default LoginForm;
