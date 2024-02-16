'use client';
import { mockContacts } from '@/mocks/contact';
import { Contact } from '@/models/contact';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <Container>
      <Typography variant="h1">Main Page</Typography>
      <Typography mb={2}>List of Contacts</Typography>
      <Grid container spacing={2}>
        {contacts.map((c) => (
          <Grid key={c.id} item xs={12}>
            <Typography>First Name: {c.firstName}</Typography>
            <Typography>
              Last Name:{' '}
              {c.lastName ?? ' This contact does not have a last name.'}
            </Typography>
            <Typography>Email: {c.email}</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Edit Contact</Button>
              <Button variant="contained" onClick={() => handleDelete(c.id)}>
                Remove Contact
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
