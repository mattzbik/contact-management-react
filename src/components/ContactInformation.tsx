'use client';

import { InputField } from '@/components/InputField';
import { DataContext } from '@/context/context';
import { Contact } from '@/models/contact';
import { emailRules, firstNameRules, lastNameRules } from '@/utils/utils';
import { Close } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const ContactInformation: React.FC<{
  onSubmit: SubmitHandler<Contact>;
  isEdit?: boolean;
  id?: number;
}> = ({ isEdit = false, id, onSubmit }) => {
  const { contacts } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const contact = contacts.find((c) => c.id === id);
  const formReturnValues = useForm<Contact>({
    defaultValues: {
      firstName: isEdit ? contact?.firstName : '',
      lastName: isEdit ? contact?.lastName : '',
      email: isEdit ? contact?.email : '',
    },
  });

  const { formState, handleSubmit, setError, control, ...rest } =
    formReturnValues;
  const { isSubmitting, errors } = formState;

  const submit = (data: Contact) => {
    setOpen(false);
    for (let c of contacts) {
      if (c.email === data.email) {
        setError('email', { type: 'custom', message: 'Email exists' });
        return;
      }
    }
    onSubmit(data);
    setOpen(true);
  };

  const isErrorsEmpty = Object.keys(errors).length === 0;
  useEffect(() => {
    if (!isErrorsEmpty && open) {
      setOpen(false);
    }
  }, [isErrorsEmpty, open]);
  const formProps = {
    ...rest,
    control,
    formState: { ...formState, isSubmitting },
    handleSubmit,
    setError,
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">
          {isEdit ? 'Edit Contact' : 'Create New Contact'}
        </Typography>
        <Box component="form" width="100%" onSubmit={handleSubmit(submit)}>
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
                rules={firstNameRules}
                formProps={formProps}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                rules={lastNameRules}
                formProps={formProps}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputField
                label="Email Address"
                name="email"
                placeholder="Email Address"
                type="email"
                disabled={isEdit}
                required
                rules={emailRules}
                formProps={formProps}
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
                {isEdit ? 'Submit' : 'Create'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={open && isErrorsEmpty}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setOpen(false)}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <AlertTitle>Success</AlertTitle>
                  {isEdit ? 'Contact Updated!' : 'Contact Created!'}
                </Alert>
              </Collapse>
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

export default ContactInformation;
