'use client';

import ContactInformation from '@/components/ContactInformation';
import { DataContext } from '@/context/context';
import { Contact } from '@/models/contact';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

const EditContact: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { contacts } = useContext(DataContext);
  const id = Number(params.id);
  const contact = contacts.find((c) => c.id === id);

  const onSubmit: SubmitHandler<Contact> = (data) => {
    if (!contact) {
      return;
    }
    const { id, email } = contact,
      { firstName, lastName } = data;

    const updatedContact: Contact = { firstName, lastName, id, email };
    const contactIndex = contacts.findIndex((c) => c.id === id);
    contacts[contactIndex] = updatedContact;
  };

  return (
    <ContactInformation isEdit id={Number(params.id)} onSubmit={onSubmit} />
  );
};

export default EditContact;
