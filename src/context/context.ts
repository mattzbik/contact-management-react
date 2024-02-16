import { Contact } from '@/models/contact';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export const DataContext = createContext<{
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
}>({
  contacts: [],
  setContacts: () => {},
});

export const useContactContext = () => useContext(DataContext);
