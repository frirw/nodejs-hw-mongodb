import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const addContact = payload => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    _id,
    payload,
    { new: true }
  );
  return updatedContact;
};


  export const deleteContactById = async (id) => {
    const contact = await ContactsCollection.findOneAndDelete({
      _id: id,
    });
  
    return contact;
  };
