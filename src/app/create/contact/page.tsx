'use client';
import { InputField } from '@/components/InputField';
import { DataContext } from '@/context/context';
import { Contact } from '@/models/contact';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const CreateContact: React.FC = () => {
  const { contacts, setContacts } = useContext(DataContext);
  const formReturnValues = useForm<Contact>({
    defaultValues: { firstName: '', lastName: '', email: '' },
  });

  const { formState, handleSubmit, setError, control, ...rest } =
    formReturnValues;
  const { isSubmitting, errors } = formState;

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    data.id = contacts.length + 1;
    for (let c of contacts) {
      if (c.email === data.email) {
        setError('email', { type: 'custom', message: 'Email exists' });
        return;
      }
    }
    setContacts([...contacts, data]);
  };
  const isErrorsEmpty = Object.keys(errors).length === 0;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">Create New Contact</Typography>
        <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={3}>
              <InputField
                label="First Name"
                name="firstName"
                placeholder="First Name"
                required
                rules={{
                  required: { value: true, message: 'First Name is required.' },
                  maxLength: {
                    value: 25,
                    message: 'First Name has a maximum of 25 characters',
                  },
                  minLength: {
                    value: 3,
                    message: 'First Name requires a minimum of 3 characters.',
                  },
                }}
                formProps={{
                  ...rest,
                  control,
                  formState: { ...formState, isSubmitting },
                  handleSubmit,
                  setError,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                rules={{
                  maxLength: {
                    value: 30,
                    message:
                      'If inputted, Last Name has a maximum of 30 characters',
                  },
                  minLength: {
                    value: 2,
                    message:
                      'If inputted, Last Name requires a minimum of 2 characters.',
                  },
                }}
                formProps={{
                  ...rest,
                  control,
                  formState: { ...formState, isSubmitting },
                  handleSubmit,
                  setError,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputField
                label="Email Address"
                name="email"
                placeholder="Email Address"
                type="email"
                rules={{
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address.',
                  },
                }}
                formProps={{
                  ...rest,
                  control,
                  formState: { ...formState, isSubmitting },
                  handleSubmit,
                  setError,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                disabled={!isErrorsEmpty}
                fullWidth
                variant="contained"
                size="large"
                type="submit"
              >
                Create
              </Button>
            </Grid>
          </Grid>
          {!isErrorsEmpty && (
            <Alert sx={{ mt: 2 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              {Object.entries(errors).map(([k, v]) => (
                <Box key={k}>
                  <Typography>{v?.message}</Typography>
                </Box>
              ))}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateContact;
