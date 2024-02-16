'use client';
import ContactInformation from '@/components/ContactInformation';
import { DataContext } from '@/context/context';
import { Contact } from '@/models/contact';
import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const CreateContact: React.FC = () => {
  const { contacts, setContacts } = useContext(DataContext);
  const onSubmit: SubmitHandler<Contact> = (data) => {
    data.id = contacts.length + 1;

    setContacts([...contacts, data]);
  };

  return <ContactInformation onSubmit={onSubmit} />;
};

export default CreateContact;
